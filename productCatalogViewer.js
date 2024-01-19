//importing the required modules
const fs = require('fs');
const readline = require('readline');
const {Table}=require("console-table-printer")

// Reading and parsing JSON files
const books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
const clothing = JSON.parse(fs.readFileSync('clothing.json', 'utf8'));
const electronics = JSON.parse(fs.readFileSync('electronics.json', 'utf8'));

// Display categories of products
console.log('Please select a category:');
console.log('1. Books');
console.log('2. Clothing');
console.log('3. Electronics');

// Create readline interface
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Taking user input for category selection
rl.question('Enter the number of your choice: ', (category) => {
 switch (category) {
    case '1':
      displayProducts(books);
      break;
    case '2':
      displayProducts(clothing);
      break;
    case '3':
      displayProducts(electronics);
      break;
    default:
      console.log('Invalid choice. Please run the script again.');
 }

 rl.close();
});

//Creating an empty table with required headings
const table = new Table({
   
    columns: [
     {name: 'ID', alignment: 'left'},
     {name: 'Name', alignment: 'left'},
     {name: 'Type', alignment: 'left'},
     {name: 'Price', alignment: 'right'},
     {name: 'Currency', alignment: 'left'},
     {name: 'Discount', alignment: 'left'},
     {name: 'Inventory', alignment: 'left'}
    ]
})

// Function to display products of the selected category in a formatted table
function displayProducts(category) {
    category.products.forEach(product => {

        table.addRow(
    
          {ID: product.id,
            Name: product.name,
            Type: product.type,
            Price: product.price,
            Currency: product.currency,
            Discount: product.discount,
            Inventory: product.inventory
        },
    
        );
     });
     table.printTable();
};