//importing the required modules
const fs = require('fs');
const readline = require('readline');
const {Table}=require("console-table-printer");

// Reading and parsing JSON files
const books = JSON.parse(fs.readFileSync('books.json', 'utf8'));
const clothing = JSON.parse(fs.readFileSync('clothing.json', 'utf8'));
const electronics = JSON.parse(fs.readFileSync('electronics.json', 'utf8'));

// Display categories of products
console.log('Please select a category:');
console.log('1. Books');
console.log('2. Clothing');
console.log('3. Electronics');

//To create readline interface
const rl = readline.createInterface({
 input: process.stdin,
 output: process.stdout
});

// Taking user input for category selection
rl.question('Enter the number of your choice to display the products available: ', (category) => {
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
 };
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
async function displayProducts(category) {
  category.products.forEach(product => {
    table.addRow(
      {ID: product.id,
        Name: product.name,
        Type: product.type,
        Price: product.price,
        Currency: product.currency,
        Discount: product.discount,
        Inventory: product.inventory
    });
  });
  table.printTable();
  crud();
};

//Function to handle CRUD operations
async function crud() {
  rl.question('Any CRUD operations are to be done?\nSelect the options\n1. Create\n2. Read\n3. Update\n4. Delete\n', (answer) => {
    switch (answer) {
      case '1':
        createProduct();
        break;
      case '2':
        console.log('You Selected Read Operation');
        rl.close();
        break;
      case '3':
        updateProduct();
        break;
      case '4':
        deleteProduct();
        break;
      default:
        console.log('Invalid choice. Please run the script again.');
        rl.close();
    }
  });
}

//All Functions related to the CRUD operations
// Function to create a new product
async function createProduct() {
  const newProduct = {
    id: generateUniqueId(), // You need to implement a function to generate unique IDs
    name: 'New Product',
    type: 'Type',
    price: 20,
    currency: 'USD',
    discount: 2,
    inventory: 10
  };

  //Choose a category to add the new product
  await rl.question('Enter the number of the category to add the new product:\n1. Books\n2. Clothing\n3. Electronics\n', (category) => {
    switch (category) {
      case '1':
        books.products.push(newProduct);
        updateFile('books.json', books);
        break;
      case '2':
        clothing.products.push(newProduct);
        updateFile('clothing.json', clothing);
        break;
      case '3':
        electronics.products.push(newProduct);
        updateFile('electronics.json', electronics);
        break;
      default:
        console.log('Invalid category. Product not added.');
    }

    console.log('New product added successfully!');
    rl.close();
  });
}

//Function to update a product
async function updateProduct() {
  // Choosing a category to update the product
  rl.question('Enter the number of the category to update a product:\n1. Books\n2. Clothing\n3. Electronics\n', (category) => {
    let selectedCategory;
    switch (category) {
      case '1':
        selectedCategory = books;
        break;
      case '2':
        selectedCategory = clothing;
        break;
      case '3':
        selectedCategory = electronics;
        break;
      default:
        console.log('Invalid category,operation not done.');
        rl.close();
        return;
    }

    // Choose the product ID to update
    console.log('Available ids are :')
    selectedCategory.products.forEach((item) =>{
        console.log(item.id)
    })
    rl.question('Enter the ID of the product to update: ', (productid) => {
      const productIndex = selectedCategory.products.findIndex(product => product.id === productid);
      if (productIndex!== -1) {
        // Update product details
        selectedCategory.products[productIndex] = {
          id: productid,
          name: 'Updated Product',
          type: 'Updated Type',
          price: 100,
          currency: 'USD',
          discount: 10,
          inventory: 50
        };

        category=changeType(category)
        // Update the JSON file
        updateFile(`${category.toLowerCase()}.json`, selectedCategory);

        console.log('Product updated successfully!');
      } else {
        console.log('Product not found.');
      }

      rl.close();
    });
  });
}

//Function to delete a product
async function deleteProduct() {
  // Choose a category to delete the product
  rl.question('Enter the number of the category to delete a product:\n1. Books\n2. Clothing\n3. Electronics\n', (category) => {
    let selectedCategory;
    switch (category) {
      case '1':
        selectedCategory = books;
        break;
      case '2':
        selectedCategory = clothing;
        break;
      case '3':
        selectedCategory = electronics;
        break;
      default:
        console.log('Invalid category. Operation canceled.');
        rl.close();
        return;
    }
    //Printing Available ids
    console.log('Available ids are :')
    selectedCategory.products.forEach((item) =>{
        console.log(item.id)
    })
    // Choose the product ID to delete
    rl.question('Enter the ID of the product to delete: ', (productId) => {
      const productIndex = selectedCategory.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        // Remove the product from the array
        selectedCategory.products.splice(productIndex, 1);

        category=changeType(category)
        // Update the JSON file
        updateFile(`${category.toLowerCase()}.json`, selectedCategory);

        console.log('Product deleted successfully!');
      } else {
        console.log('Product not found.');
      }

      rl.close();
    });
  });
}

//Function to update the JSON file with new data
async function updateFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8');
}

//Function to generate a unique ID (you may use a more robust solution in a real-world scenario)
function generateUniqueId() {
  return Math.random().toString(36).substr(2,4);
}
function changeType(item){
    switch(item){
        case '1':
            return 'books';
        case '2':
            return 'clothing';
        case '3':
            return 'electronics';
    }
}