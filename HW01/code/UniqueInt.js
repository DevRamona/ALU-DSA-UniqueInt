function UniqueInt(inputFile) {
  const fs = require("fs").promises; 

  async function readFile() {
    try {
      const data = await fs.readFile(inputFile, "utf-8");
      return data.trim().split(/\s+/); 
    } catch (err) {
      console.error(`Error reading file: ${err}`);
      return [];
    }
  }

  async function processData(data) {
    const uniqueNumbers = {};

    for (const line of data) {
      const number = parseInt(line, 10);
      
      if (line.length === 0 || isNaN(number)) {
        continue;
      }

      
      if (!uniqueNumbers.hasOwnProperty(number)) {
        uniqueNumbers[number] = true;
      }
    }

    // Sort using bubble sort (custom implementation)
    const sortedArray = bubbleSort(extractNumbersFromArray(uniqueNumbers));

    return sortedArray;
  }


  function extractNumbersFromArray(obj) {
    const result = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push(parseInt(key, 10)); // Parse the key back to a number
      }
    }
    return result;
  }
  //   bubble sort
  function bubbleSort(data) {
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i] > data[i + 1]) {
          // Swap elements
          const temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return data;
  }

  async function writeToFile(data) {
    try {
      await fs.writeFile(
        `../output_Files/${inputFile.split("/").slice(-1)}_results.txt`,
        data.join("\n") + "\n",
        "utf-8"
      );
    } catch (err) {
      console.error(`Error writing to file: ${err}`);
    }
  }

  (async () => {
    const fileData = await readFile();
    const processedData = await processData(fileData);
    await writeToFile(processedData);
  })();
}
UniqueInt("../input_Files/sample_02.txt");
