const fs = require("fs");
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js")

pdfjsLib.GlobalWorkerOptions.workerSrc = false;
const extractPdfText = async (filePath) => {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({
        data,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true
    }).promise;

    let pages = []
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const lines = {};
        content.items.forEach(item => {

            const y = item.transform[5];
            const text = item.str.trim();


            if (!text) return;
            const key = Math.round(y);
            if (!lines[key]) {
                lines[key] = []
            }
            lines[key].push({
                text,
                fontSize: item.transform[0]
            });
        });
        const sortedLines = Object.keys(lines)
            .sort((a, b) => b - a)
            .map(key => {
                const lineItems = lines[key];

                const combinedText = lineItems
                    .map(item => item.text)
                    .join(" ");

                const avgFont =
                    lineItems.reduce((sum, item) => sum + item.fontSize, 0) /
                    lineItems.length;

                return {
                    text: combinedText,
                    fontSize: avgFont
                };
            });



        const structuredSections = [];
        let currentSection = {
            heading: "General",
            content: ""
        }
        sortedLines.forEach(lineObj => {

            const line = lineObj.text;
            const fontSize = lineObj.fontSize;

            const isHeading =
                fontSize > 14 ||
                /^[0-9]+(\.[0-9]+)*\s/.test(line) ||
                /^[A-Z\s]{5,}$/.test(line);

            if (isHeading) {
                if (currentSection.content.trim() !== "") {
                    structuredSections.push(currentSection);
                }
                ``
                currentSection = {
                    heading: line.trim(),
                    content: ""
                };
            } else {
                currentSection.content += line + "\n";
            }
        });


        if (currentSection.content.trim() !== "") {
            structuredSections.push(currentSection);
        }

        pages.push({
            pageNumber: i,
            Sections: structuredSections
        });
    }
    return pages;

}
module.exports = { extractPdfText }