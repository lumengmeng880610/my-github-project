function IsNumeric(sText)

{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i);  //charAt(index)方法可返回指定位置的字符；js并没有一种有别于字符串类型的字符数据类型，所以返回的
      //字符是长度为1的字符串。index，必填，表示字符串中某个位置的数字，即字符在字符串中的下标。
      //字符串中第一个字符的下标是 0。如果参数 index 不在 0 与 string.length 之间，该方法将返回一个空字符串。
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
   
};

function calcProdSubTotal() {
    
    var prodSubTotal = 0;

    $(".row-total-input").each(function(){
    
        var valString = $(this).val() || 0;
        prodSubTotal += parseInt(valString);
                    
    });
    //产品小计的金额  
    $("#product-subtotal").val(prodSubTotal);

};

function calcTotalPallets() {

    var totalPallets = 0;

    $(".num-pallets-input").each(function() {
    
        var thisValue = $(this).val();
    
        if ( (IsNumeric(thisValue)) &&  (thisValue != '') ) {
        
            totalPallets += parseInt(thisValue);
        
        };
    
    });
    //商品总数量
    $("#total-pallets-input").val(totalPallets);

};

function calcShippingTotal() {

    var totalPallets = $("#total-pallets-input").val() || 0;
    var shippingRate = $("#shipping-rate").text() || 0;
    var shippingTotal = totalPallets * shippingRate;
    //商品的总运费
    $("#shipping-subtotal").val(shippingTotal);

};

function calcOrderTotal() {

    var orderTotal = 0;

    var productSubtotal = $("#product-subtotal").val() || 0;
    var shippingSubtotal = $("#shipping-subtotal").val() || 0;
        
    var orderTotal = parseInt(productSubtotal) + parseInt(shippingSubtotal);
    var orderTotalNice = "$" + orderTotal;
    //订单总金额 = 商品总金额 + 总运费
    $("#order-total").val(orderTotalNice);
        
};

$(function(){

    $('.num-pallets-input').each(function(){
    
        var $this = $(this);
    
        var numPallets = $this.val();  //这种商品的数量
        var multiplier = $this
                            .parent().parent()
                            .find("td.price-per-pallet span")
                            .text();    //这种商品的单价
        
        if ( (IsNumeric(numPallets)) && (numPallets != '') ) {
            
            var rowTotal = numPallets * multiplier;
            
            $this
                .css("background-color", "white")
                .parent().parent()
                .find("td.row-total input")
                .val(rowTotal);                    
            
        } else {
        
            $this.css("background-color", "#ffdcdc"); 
                        
        };
        
        calcProdSubTotal();
        calcTotalPallets();
        calcShippingTotal();
        calcOrderTotal();
    
    });
    $('.num-pallets-input').blur(function(){
    
        var $this = $(this);
    
        var numPallets = $this.val();  //这种商品的数量
        var multiplier = $this
                            .parent().parent()
                            .find("td.price-per-pallet span")
                            .text();    //这种商品的单价
        
        if ( (IsNumeric(numPallets)) && (numPallets != '') ) {
            
            var rowTotal = numPallets * multiplier;
            
            $this
                .css("background-color", "white")
                .parent().parent()
                .find("td.row-total input")
                .val(rowTotal);                    
            
        } else {
        
            $this.css("background-color", "#ffdcdc"); 
                        
        };
        
        calcProdSubTotal();
        calcTotalPallets();
        calcShippingTotal();
        calcOrderTotal();
    
    });

});