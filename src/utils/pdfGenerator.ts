import { jsPDF } from "jspdf";

interface Section {
  title: string;
  content: string;
}

export function parseMarkdownReport(markdown: string) {
  const lines = markdown.split("\n");
  let title = "Bug Bounty Report";
  let target = "N/A";
  let vulnType = "N/A";
  let severity = "Medium";
  let platform = "Generic";

  const sections: Section[] = [];
  let currentSectionTitle = "";
  let currentSectionLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Parse Title
    if (line.startsWith("# ")) {
      title = line.substring(2).trim();
      continue;
    }

    // 2. Parse Metadata (with defensive cleaning of markdown characters)
    if (line.startsWith("**Target:**")) {
      target = line
        .replace(/\*\*Target:\*\*/i, "")
        .replace(/\*\*/g, "")
        .replace(/`/g, "")
        .trim();
      continue;
    }
    if (line.startsWith("**Vulnerability Type:**")) {
      vulnType = line
        .replace(/\*\*Vulnerability Type:\*\*/i, "")
        .replace(/\*\*/g, "")
        .replace(/`/g, "")
        .trim();
      continue;
    }
    if (line.startsWith("**Severity:**")) {
      severity = line
        .replace(/\*\*Severity:\*\*/i, "")
        .replace(/\*\*/g, "")
        .replace(/`/g, "")
        .trim();
      continue;
    }
    if (line.startsWith("**Platform:**")) {
      platform = line
        .replace(/\*\*Platform:\*\*/i, "")
        .replace(/\*\*/g, "")
        .replace(/`/g, "")
        .trim();
      continue;
    }

    // 3. Parse Section Headers
    if (line.startsWith("## ")) {
      if (currentSectionTitle) {
        sections.push({
          title: currentSectionTitle,
          content: currentSectionLines.join("\n").trim(),
        });
      }
      currentSectionTitle = line.substring(3).trim();
      currentSectionLines = [];
      continue;
    }

    // Skip horizontal divider
    if (line === "---") {
      continue;
    }

    // 4. Accumulate section body (using original line to preserve internal spacing)
    if (currentSectionTitle) {
      currentSectionLines.push(lines[i]);
    }
  }

  // Push final section
  if (currentSectionTitle) {
    sections.push({
      title: currentSectionTitle,
      content: currentSectionLines.join("\n").trim(),
    });
  }

  return {
    title,
    target,
    vulnType,
    severity,
    platform,
    sections,
  };
}

// Page header helper
function drawPageHeader(doc: jsPDF) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 117, 39); // BugForge Orange #FF7527
  doc.text("BUGFORGE", 20, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("•  AI Security Report Generator", 42, 15);

  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.2);
  doc.line(20, 18, 190, 18);
}

// Severity badge helper
function drawSeverityBadge(doc: jsPDF, severity: string, x: number, y: number) {
  let badgeColor: [number, number, number] = [100, 116, 139]; // Slate gray
  let textColor: [number, number, number] = [255, 255, 255];

  const sevLower = severity.toLowerCase();
  if (sevLower.includes("critical")) {
    badgeColor = [220, 38, 38]; // Red
  } else if (sevLower.includes("high")) {
    badgeColor = [234, 88, 12]; // Orange
  } else if (sevLower.includes("medium")) {
    badgeColor = [217, 119, 6]; // Amber
  } else if (sevLower.includes("low")) {
    badgeColor = [13, 148, 136]; // Teal
  }

  doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  
  const textWidth = doc.getTextWidth(severity);
  const badgeWidth = textWidth + 6;
  const badgeHeight = 6;

  // Draw rounded rect
  doc.roundedRect(x, y - 4.5, badgeWidth, badgeHeight, 1, 1, "F");
  
  // Draw text centered in badge
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);
  doc.text(severity, x + 3, y - 0.2);
}

export function exportReportToPDF(markdownText: string) {
  const data = parseMarkdownReport(markdownText);

  // Initialize A4 PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const marginX = 20;
  const maxWidth = 170; // 210 - 20 - 20
  let currentY = 25;

  // --- 1. Top Logo & Header (First Page) ---
  doc.setFillColor(255, 117, 39); // Orange accent bar
  doc.rect(20, currentY, 6, 6, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("BUGFORGE", 29, currentY + 4.8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  const dateStr = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Tanggal Laporan: ${dateStr}`, 190, currentY + 4, { align: "right" });

  currentY += 12;

  // Divider
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.setLineWidth(0.5);
  doc.line(20, currentY, 190, currentY);

  currentY += 10;

  // --- 2. Title ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  
  const titleLines = doc.splitTextToSize(data.title, maxWidth);
  titleLines.forEach((line: string) => {
    doc.text(line, marginX, currentY);
    currentY += 8;
  });

  currentY += 4;

  // --- 3. Metadata Card ---
  const cardHeight = 34;
  doc.setFillColor(248, 250, 252); // slate-50 background
  doc.setDrawColor(226, 232, 240); // slate-200 border
  doc.setLineWidth(0.3);
  doc.roundedRect(20, currentY, maxWidth, cardHeight, 2, 2, "FD");

  // Metadata items
  const col1X = 25;
  const col2X = 110;
  let itemY = currentY + 8;

  // Row 1
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("TARGET HOST / URL", col1X, itemY);
  doc.text("SEVERITY LEVEL", col2X, itemY);

  itemY += 5;
  doc.setFont("courier", "bold"); // Target in monospace
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59); // slate-800
  doc.text(data.target, col1X, itemY);
  
  drawSeverityBadge(doc, data.severity, col2X, itemY);

  // Row 2
  itemY += 9;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("VULNERABILITY TYPE", col1X, itemY);
  doc.text("PLATFORM", col2X, itemY);

  itemY += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(data.vulnType, col1X, itemY);
  doc.text(data.platform, col2X, itemY);

  currentY += cardHeight + 12;

  // --- 4. Content Sections ---
  let inCodeBlock = false;

  data.sections.forEach((section) => {
    // Check if we need to wrap the section header to next page
    if (currentY > 245) {
      doc.addPage();
      drawPageHeader(doc);
      currentY = 28;
    }

    // Draw section accent indicator
    doc.setFillColor(255, 117, 39); // BugForge orange
    doc.rect(20, currentY - 4.5, 2.5, 5, "F");

    // Clean up title emoji/special characters using only safe ASCII characters
    const titleClean = section.title.replace(/[^A-Za-z0-9\s()]/g, "").trim();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(titleClean, 25, currentY);
    
    currentY += 6;

    // Divider line below header
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.setLineWidth(0.2);
    doc.line(20, currentY - 2, 190, currentY - 2);

    currentY += 2;

    // Body Text Formatting
    const textLines = section.content.split("\n");
    textLines.forEach((textLine) => {
      const trimmedLine = textLine.trim();
      if (!trimmedLine) {
        if (!inCodeBlock) {
          currentY += 4; // empty line spacer for normal text
        } else {
          currentY += 2; // smaller spacer for empty lines inside code blocks
        }
        return;
      }

      // Check for code block fences
      if (trimmedLine.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        currentY += 2; // small spacer
        return;
      }

      if (inCodeBlock) {
        // Draw code block line
        const fontName = "courier";
        const fontStyle = "normal";
        const fontSize = 9;
        const color: [number, number, number] = [30, 41, 59]; // slate-800
        const indentX = marginX + 6;

        // Render code block background box
        const lineHeightMm = (fontSize * 1.5) * 0.352778;
        doc.setFillColor(248, 250, 252); // slate-50 background for code block
        doc.rect(marginX, currentY - 3.5, maxWidth, lineHeightMm + 1, "F");

        doc.setFont(fontName, fontStyle);
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        doc.text(textLine, indentX, currentY); // keep original indent inside code blocks
        currentY += lineHeightMm + 1;
        return;
      }

      // Detect lists with bold headers: e.g. "1. **Input Validation:** Implement..."
      const listBoldMatch = trimmedLine.match(/^(\s*(\d+\.|\-|\*)\s+)\*\*(.*?)\*\*(.*)$/);
      if (listBoldMatch) {
        const marker = listBoldMatch[1]; // e.g. "1. " or "- "
        const boldTitle = listBoldMatch[3]; // e.g. "Input Validation:"
        const restOfLine = listBoldMatch[4]; // e.g. " Implement..."
        
        const indentX = marginX + (marker.includes(".") ? 4 : 2);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85); // slate-700
        doc.text(marker, indentX, currentY);
        
        const markerWidth = doc.getTextWidth(marker);
        
        doc.setFont("helvetica", "bold");
        doc.text(boldTitle, indentX + markerWidth, currentY);
        
        const boldTitleWidth = doc.getTextWidth(boldTitle);
        const prefixWidth = markerWidth + boldTitleWidth;
        
        // Clean backticks from the remaining line
        const cleanSuffix = restOfLine.replace(/`/g, "");
        
        doc.setFont("helvetica", "normal");
        const suffixLines = doc.splitTextToSize(cleanSuffix, maxWidth - prefixWidth - (indentX - marginX));
        const lineHeightMm = (10 * 1.45) * 0.352778;
        
        suffixLines.forEach((line: string, index: number) => {
          if (currentY > 265) {
            doc.addPage();
            drawPageHeader(doc);
            currentY = 28;
          }
          
          if (index === 0) {
            doc.text(line, indentX + prefixWidth, currentY);
          } else {
            doc.text(line, indentX + markerWidth, currentY);
          }
          currentY += lineHeightMm;
        });
        return;
      }

      // Detect standard lists: e.g. "1. Login..."
      const listMatch = trimmedLine.match(/^(\s*(\d+\.|\-|\*)\s+)(.*)$/);
      if (listMatch) {
        const marker = listMatch[1];
        const restOfLine = listMatch[3];
        
        const indentX = marginX + (marker.includes(".") ? 4 : 2);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85);
        doc.text(marker, indentX, currentY);
        
        const markerWidth = doc.getTextWidth(marker);
        const cleanText = restOfLine.replace(/`/g, "").replace(/\*\*/g, "");
        
        const textLines = doc.splitTextToSize(cleanText, maxWidth - markerWidth - (indentX - marginX));
        const lineHeightMm = (10 * 1.45) * 0.352778;
        
        textLines.forEach((line: string) => {
          if (currentY > 265) {
            doc.addPage();
            drawPageHeader(doc);
            currentY = 28;
          }
          doc.text(line, indentX + markerWidth, currentY);
          currentY += lineHeightMm;
        });
        return;
      }

      // General Text Formatting (Normal paragraphs)
      // Clean up markdown bold (**) and inline code (`) markers
      const cleanLine = textLine.replace(/\*\*/g, "").replace(/`/g, "");
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85); // slate-700
      
      const splitLines = doc.splitTextToSize(cleanLine, maxWidth);
      const lineHeightMm = (10 * 1.45) * 0.352778;

      splitLines.forEach((line: string) => {
        if (currentY > 265) {
          doc.addPage();
          drawPageHeader(doc);
          currentY = 28;
        }
        doc.text(line, marginX, currentY);
        currentY += lineHeightMm;
      });
    });

    currentY += 8; // Spacer between sections
  });

  // --- 5. Page Numbering & Footer (Second Pass) ---
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Draw footer divider
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.setLineWidth(0.3);
    doc.line(20, 280, 190, 280);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    
    // Left-aligned footer
    doc.text("Laporan Keamanan Rahasia  |  Dibuat oleh BugForge", 20, 285);
    
    // Right-aligned page number
    doc.text(`Halaman ${i} dari ${totalPages}`, 190, 285, { align: "right" });
  }

  // Save/Download PDF
  const safeTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  doc.save(`bugforge-report-${safeTitle}.pdf`);
}
