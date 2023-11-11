const http = require("http");
const xml = require("fast-xml-parser");
const fs = require("node:fs");

const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder({ format: true });
const server = http.createServer((req, res) => {
    const xmldata = fs.readFileSync("data.xml", "utf-8");
    const obj = parser.parse(xmldata);
    const filteredData = obj.indicators.inflation.filter(item => item.ku === 13 && item.value > 5);
    const necessaryData = filteredData.map(item => item.value);
    const xmlObj = {
        data: {
            value: necessaryData
        }
    };
    const ActualXml = builder.build(xmlObj);
    res.setHeader('Content-Type', 'application/xml');
    res.end(ActualXml);
});
const port = 8000;
server.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`);
});