$(document).ready(()=>{

    
    
    $('#trx').val(1) // 'TRON TO CONVERT' Box
    $('#sun').val(1 * 1000000) // 'SUN TO CONVERT' Box
    
    $.ajax({
        url: "https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD", success: function(trxRate){
            let trx = parseInt($('.buy-input').val()); // Get TRX Value in the text box
            $('#usdBuyValue').val(trx * trxRate.USD) // Set USD value in the text box
        }
    });

    $("#trx").keyup(function(data) {
        $('#sun').val($('#trx').val()*1000000 )
        $.ajax({
            url: "https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD", success: function(trxRate){
                let trx = parseInt($('#trx').val());
                $('#usd').val(trx * trxRate.USD)               
            }
        });
    });
    
    $("#sun").keyup(function(data) {
        $('#trx').val($('#sun').val()/1000000)
        $.ajax({
            url: "https://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD", success: function(trxRate){
                let trx = parseInt($('#trx').val());
                $('#usd').val(trx *  trxRate.USD)
            }
        });
    });
})