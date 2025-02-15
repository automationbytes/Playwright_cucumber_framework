const path = require("path")
    const os = require("os")
const fs = require("fs-extra")

const generateReportPath = path.resolve(__dirname,"Reporter/lib/generate-report.js")
const reportPath = "./report/html"
fs.removeSync(reportPath)

const generateReport = require(generateReportPath)

generateReport.generate({
	jsonDir: './reports/',
	reportPath: reportPath,
	metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'ubuntu',
            version: '16.04'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Custom project'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
        ]
    }
});