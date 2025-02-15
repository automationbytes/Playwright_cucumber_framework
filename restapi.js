// const fs = require('fs');
// const Excel = require('exceljs');
// //const util = require('./path/to/util'); // Import the util module with read_excel and other methods

// async function modifyRequestWithExcelData(request, sheetname, label) {
//   try {
//     const modifiedRequest = { ...request };

//     // Function to update a single property value based on util.read_excel result
//     const updatePropertyValue = async (propertyValue, propertyName) => {
//       return `await util.read_excel("${sheetname}", "${label}", "${propertyName}") === "null" ? '' : await util.read_excel("${sheetname}", "${label}", "${propertyName}")`;
//     };

//     // Recursively update properties
//     const recursiveUpdate = async (obj, currentPath) => {
//       for (const property in obj) {
//         const currentPropertyPath = currentPath ? `${currentPath}.${property}` : property;
//         if (typeof obj[property] === 'object' && obj[property] !== null) {
//           await recursiveUpdate(obj[property], currentPropertyPath); // Recur for nested objects
//         } else {
//           obj[property] = await updatePropertyValue(obj[property], currentPropertyPath);
//         }
//       }
//     };

//     await recursiveUpdate(modifiedRequest, '');

//     return modifiedRequest;
//   } catch (error) {
//     // Handle any errors that might occur during the process
//     console.error('Error while processing Excel data:', error);
//     throw error;
//   }
// }

// async function writeToTextFile(data, fileName) {
//   try {
//     const textContent = JSON.stringify(data, null, 2); // Convert data to a readable format
//     fs.writeFileSync(fileName, textContent);
//     console.log(`Data written to text file "${fileName}" successfully.`);
//   } catch (error) {
//     console.error('Error writing to text file:', error);
//     throw error;
//   }
// }

// async function generateExcelSheetAndModifyRequest(request, sheetname, label) {
//   try {
//     // Generate the modified request
//     const modifiedRequestBody = await modifyRequestWithExcelData(request, sheetname, label);

//     // Write the modified request to a text file
//     const textFileName = 'modified_request.txt';
//     await writeToTextFile(modifiedRequestBody, textFileName);

//     console.log(`Modified request written to text file "${textFileName}" successfully.`);
//   } catch (error) {
//     console.error('Error generating Excel file and modifying request:', error);
//   }
// }

// // Sample request object
// const sampleRequest = {
//   common: {
//     cycle: 'O',
//   },
//   from: {
//     hierarchyId: undefined,
//     programCode: undefined,
//     type: undefined,
//     status: undefined,
//     effectiveDate: undefined,
//   },
//   to: {
//     hierarchyId: undefined,
//     type: undefined,
//     programCode: undefined,
//     effectiveDate: undefined,
//     description: undefined,
//   },
// };

// // Sample sheetname and label
// const sheetname = 'Demo';
// const label = 'label';

// // Generate the text file with the modified request
// generateExcelSheetAndModifyRequest(sampleRequest, sheetname, label);


const fs = require('fs');
const path = require('path')
const Excel = require('exceljs');
async function modifyRequestWithExcelData(request) {
  try {
    const modifiedRequest = { ...request };

    // Function to update a single property value based on util.read_excel result
    const updatePropertyValue = async (propertyValue, propertyName) => {
      return `await util.read_excel(sheetname, label, "${propertyName}") === "null" ? '' : await util.read_excel(sheetname, label, "${propertyName}")`;
    };

    // Recursively update properties
    const recursiveUpdate = async (obj, currentPath) => {
      for (const property in obj) {
        const currentPropertyPath = currentPath ? `${currentPath}.${property}` : property;
        if (typeof obj[property] === 'object' && obj[property] !== null) {
          await recursiveUpdate(obj[property], currentPropertyPath); // Recur for nested objects
        } else {
          obj[property] = await updatePropertyValue(obj[property], currentPropertyPath);
        }
      }
    };

    await recursiveUpdate(modifiedRequest, '');

    return modifiedRequest;
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error('Error while processing data:', error);
    throw error;
  }
}

async function writeToTextFile(data, fileName) {
  try {
    // Serialize the object to a string in the desired format
    const textContent = JSON.stringify(data, null, 2)
      .replace(/"await /g, 'await ')
      .replace(/\)"/g, ') ')
      .replace(/";/g, ';')
      .replace(/\\"/g, '"');

    fs.writeFileSync(fileName, textContent);
    console.log(`Data written to text file "${fileName}" successfully.`);
  } catch (error) {
    console.error('Error writing to text file:', error);
    throw error;
  }
}


async function generateExcelSheet(request, sheetname, label) {
    try {
      // Generate the modified request
      const modifiedRequestBody = await modifyRequestWithExcelData(request, sheetname, label);
  
      // Create a new workbook and add a worksheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Modified Request');
  
      // Define the dynamic column headers
      const columnHeaders = ['Label'];
      const populateColumnHeaders = (obj, currentPath) => {
        for (const property in obj) {
          const currentPropertyPath = currentPath ? `${currentPath}.${property}` : property;
          if (typeof obj[property] === 'object' && obj[property] !== null) {
            populateColumnHeaders(obj[property], currentPropertyPath); // Recur for nested objects
          } else {
            columnHeaders.push(currentPropertyPath);
          }
        }
      };
      populateColumnHeaders(modifiedRequestBody, '');
  
      // Add "Response Code" and "Response Text" columns to the header row
      columnHeaders.push('StatusCode', 'ResponseText');
  
      // Set the column headers in the worksheet
      worksheet.addRow(columnHeaders);
  
      // Generate the Excel file
      const fileName = 'modified_request.xlsx';
      const excelFilePath = path.join(__dirname, fileName);
      await workbook.xlsx.writeFile(excelFilePath);
  
      console.log(`Excel file "${fileName}" generated successfully.`);
    } catch (error) {
      console.error('Error generating Excel file and modifying request:', error);
    }
  }
  
async function generateExcelSheetAndModifyRequest(request) {
    await (generateExcelSheet(request))
  try {
    // Generate the modified request
    const modifiedRequestBody = await modifyRequestWithExcelData(request);

    // Write the modified request to a text file
    const textFileName = 'modified_request.txt';
    const txtFilePath = path.join(__dirname, textFileName);
    await writeToTextFile(modifiedRequestBody, txtFilePath);

    console.log(`Modified request written to text file "${textFileName}" successfully.`);
  } catch (error) {
    console.error('Error generating Excel file and modifying request:', error);
  }
}








// Sample request object
const sampleRequest = {
  "common": {
    "externalCustomerId": "",
    "accountId": "7523123000000001",
    "presentationId": ""
  },
}


// Generate the text file with the modified request
generateExcelSheetAndModifyRequest(sampleRequest);
