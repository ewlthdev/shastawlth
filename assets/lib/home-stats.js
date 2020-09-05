var hourglassAddress="TQ66Wiihp8V8hHVwTr3a4Byog5CyEre6nM";  // D1VS Contract
var hourglassContract;

var oneToken;
var totalSupply;
var TRXBalance;
var vaultDollarValue;

async function loadTronWeb(){
    if( typeof (window.tronWeb)=== 'undefined'){
        setTimeout(loadTronWeb,1000)
    } else {
        hourglassContract = await tronWeb.contract().at(hourglassAddress);
        setTimeout(function(){startLoop()},1000)
        setInterval(function() {refreshData();}, 2000);
    }
}

window.addEventListener("load",function() {
    loadTronWeb();
});

function startLoop(){
    refreshData();
    setTimeout(startLoop,3000)
}

function refreshData(){
    getTotalSupply();
    getVaultInfo();
}

function getTotalSupply() {
    hourglassContract.totalSupply().call().then((result)=>{
        var totalSupply=parseInt(result) / (Math.pow(10,18));
        $("#totalTokenSupply").text(totalSupply.toFixed(2));
    }).catch((error)=>{console.log(error)});
}

function getVaultInfo() {
    hourglassContract.totalTronBalance().call().then((result)=>{
        var TRXBalance=sunToDisplay(parseInt(result));
        $("#totalTronSupply").html(TRXBalance)
        
        $.ajax({
            url: "https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD", success: function(trxRate){
                $("#mcapUSD").html(formatTrxValue(TRXBalance * trxRate.USD.toFixed(4)))
            }
        })
    }).catch((error)=>{console.log(error)});
    
   
}

function formatTrxValue(_value){return parseFloat(parseFloat(_value).toFixed(2))}
function sunToDisplay(_sun){return formatTrxValue(tronWeb.fromSun(_sun))}