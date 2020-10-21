document.getElementById('loan-form').addEventListener('submit', (e) => {
    //Hide results
    document.getElementById('results').style.display='none';

    //Show loader
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

//calculate results function 
function calculateResults(){
    console.log('calculating..');
    
    //UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const yearsToRepay = document.getElementById('years');
    const monthlyPayement = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
    
    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(yearsToRepay.value) * 12;

    //compute the monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x -1);
    console.log(monthly);
    if(isFinite(monthly)){
        monthlyPayement.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);
        document.getElementById('results').style.display='block';
        document.getElementById('loading').style.display='none';
    }else{
        console.log("Please check your numbers");
        showError('Please check your numbers');
    }
}

function showError(error){

    document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='none';
    
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
   
    //create div
    const errorDiv = document.createElement('div');

    //create classname
    errorDiv.className = 'alert alert-danger';

    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}