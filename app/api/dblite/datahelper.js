import fs from "fs";
import path from "path";

// File Data
const FILE_DATA = {};
const primaryPath = path.join(process.cwd(), "app/api/dblite/data");

// Read File if data not exists
const readUpdateFile = async (file) => {
  const filePath = path.join(primaryPath, `${file}.json`);

  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify([]));
    } catch (err) {
      console.error("Error writing file:", err);
      return false;
    }
  }

  if (!Object.keys(FILE_DATA).includes(file)) {
    try {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const parsedData = JSON.parse(fileContents);
      FILE_DATA[file] = parsedData;
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }
};

// Read Data from File
const readData = async (file = "userdata") => {
  await readUpdateFile(file);

  const fileData = FILE_DATA[file];
  return fileData;
};

// Update Data to file
const updateData = async (data, file = "userdata") => {
  await readUpdateFile(file);

  FILE_DATA[file].push(data);

  try {
    fs.writeFileSync(
      path.join(primaryPath, `${file}.json`),
      JSON.stringify(FILE_DATA[file])
    );
    return true;
  } catch (err) {
    console.error("Error writing file:", err);
    return false;
  }
};

// Delete Data from file
const deleteData = async (data, file = "userdata") => {
  await readUpdateFile(file);

  FILE_DATA[file].splice(FILE_DATA[file].indexOf(data), 1);

  try {
    fs.writeFileSync(
      path.join(primaryPath, `${file}.json`),
      JSON.stringify(FILE_DATA[file])
    );
    return true;
  } catch (err) {
    console.error("Error writing file:", err);
    return false;
  }
};

export { readData, updateData, deleteData };
