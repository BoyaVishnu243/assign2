const fs= require("fs");
const readline=require("readline");
const {Table,printTable}=require("console-table-printer");

filepaths=["clothing.json","electronics.json","books.json"];

//creating interface for taking input using readline
const reli= readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

//function to read the data from each json files
 function inputjsonfile(filepath)
 {
    const data =fs.readFileSync(filepath);
    return JSON.parse(data);
   
 }
 
 //creating an empty table with column headings
 const p =new Table({
    coloumns : [{Name : "id"},{Name : "name"},{Name : "type"},{Name : "price"},{Name : "discount"},{Name : "currency"},{Name : "inventory"}]});

//To combine the three json files using for each loop
 var combineData = [];
//to copy data from json files and copy it to complete data array
 filepaths.forEach(filepath => {
    const loopData= inputjsonfile(filepath);
    combineData.push(loopData);
 });
// to take input from the user
const showOptions=()=>{
    console.log("1. Books");
    console.log("2. clothings");
    console.log("3. Electronics");
    console.log("4. exit");
    reli.question("choose your option   ",userInput=>{
        UserChoice(userInput);
    });
}


//if condition to print the details of desired products
function UserChoice(choice){
    if (choice == "1"){

       
        const booksdata = combineData.find(type => type.category == 'books');
        const productarray = booksdata.products;
        booksdata.products.forEach(product=>{
            p.addRow({
                Id : product.id,
                Name : product.name,
                Type :product.type,
                Price : product.price,
                Discount : product.discount,
                Inventory : product.inventory,
                Currency :product.currency
            })
        });
        console.log("Products related to books...")
       p.printTable();
       
        reli.close();
    }
    else if (choice == "2"){
        const clothingsdata = combineData.find(type => type.category == 'clothing');
        const productarray = clothingsdata.products;
        clothingsdata.products.forEach(product=>{
            p.addRow({
                Id : product.id,
                Name : product.name,
                Type :product.type,
                Price : product.price,
                Discount : product.discount,
                Inventory : product.inventory,
                Currency :product.currency
            })
        });
        console.log("products related to clothing...")
       p.printTable();
       
        reli.close()

        
    }
    else if (choice == "3") {
        const electronicsdata = combineData.find(type => type.category == 'electronics');
        const productarray = electronicsdata.products;
        electronicsdata.products.forEach(product=>{
            p.addRow({
                Id : product.id,
                Name : product.name,
                Type :product.type,
                Price : product.price,
                Discount : product.discount,
                Inventory : product.inventory,
                Currency :product.currency
            })
        });
        console.log("Products related to electronics...")
       p.printTable();
       
        reli.close()
    }
    else {
        console.log("thank you for shopping with us")
        reli.close()
    }
}

//To start the program by invoking the showOptions() function
showOptions();