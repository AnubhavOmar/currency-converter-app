// aLL SELECTORS 

let btn = document.querySelector("#convert-btn");
let input = document.querySelector("#amount");
let dropdown1 = document.getElementById("dropdown-1");
let dropdown2 = document.getElementById("dropdown-2");
let result_para = document.querySelector("#result");

/* anytime if the api key limit reached then just change the api key again with new apikey */


// step - 1 Fetching the data from the API and Fetching the data 
fetch("https://api.currencyapi.com/v3/latest?apikey=cur_live_t1hbtEWVZyZZ9MLrS7UJzbNdoJCeOEna6oVHflDG")
.then(function(raw_data){
    return raw_data.json() ; // converting fetched raw data from the api
})
.then(function(fetched_original_data){

    let data = fetched_original_data.data ;
    
    // Step 2 - Adding all the currency in the dropdown and the most frequently used adding them at top 

    let popularCurrencies = ["USD", "INR", "EUR", "GBP", "AED", "JPY"];

    // pehle popular currencies
    popularCurrencies.forEach(function(code){
        if (data[code]) {
            option_adder(code);
        }
    });

    // separator
    let separator = document.createElement("option");
    separator.textContent = "--------";
    separator.disabled = true;

    dropdown1.appendChild(separator.cloneNode(true));
    dropdown2.appendChild(separator.cloneNode(true));

    // baaki currencies
    Object.keys(data).forEach(function(code){
        if (!popularCurrencies.includes(code)) {
            option_adder(code);
        }
    });
 
    // now calling the fuction which will calulate the result and that function will add it in result 

    btn.addEventListener("click" , function(details){

        details.preventDefault() ; //stops the page to reload 
        
        convert_the_input_data(
            input.value,
            data[dropdown1.value].value,   // fromRate
            data[dropdown2.value].value    // toRate
        );

    })

})
.catch(function(err){
    console.log("The api cannot fetched data error is = ",err);
}) ;



function option_adder(val)
{
    // Dono dropdown pakad lo

    // Option 1 (dropdown-1 ke liye)
    let option1 = document.createElement("option");
    option1.value = val;
    option1.textContent = val;

    // Option 2 (dropdown-2 ke liye)
    let option2 = document.createElement("option");
    option2.value = val;
    option2.textContent = val;

    // Dono me add karo
    dropdown1.appendChild(option1);
    dropdown2.appendChild(option2);
}


function convert_the_input_data(input_from_user , from_rate , to_rate){
    
    let amount = Number(input_from_user);

    if (!amount || amount <= 0) {
        result_para.innerText = "Please enter a valid amount";
        return;
    }

    let usd_value = amount / from_rate ;
    let result = usd_value * to_rate;

    // now callling the functio to add this in the result 
    
    add_the_converted_currnecy_in_html(
        result,
        amount,
        dropdown1.value,
        dropdown2.value
    );

    // input reset
    input.value = "";
}

function add_the_converted_currnecy_in_html(result, amount, from, to)
{
    // adds the result in html 

    result_para.innerText = `The converted value of ${amount} ${from} in ${to} is ${result.toFixed(2)}`;
}