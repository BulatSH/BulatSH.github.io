//  ***функция для создания элемента ввода чисел****************************************
// использование: onkeypress="validInputForNumber(event,this);"
function zivalidInputForNumber(evt,obj) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode( key );
	var regex = /[0-9]|\,/;
	var regexNon = /[0-9]/;
	if( theEvent.keyCode!=8 && theEvent.keyCode!=37 && theEvent.keyCode!=39 && theEvent.keyCode!=46 )
	{
		if(obj)
		{
			if(obj.value && obj.value.split(',').length==1)
			{
				if( !regex.test(key) || obj.value.length>10 ) {
					theEvent.returnValue = false;
					if(theEvent.preventDefault) theEvent.preventDefault();
				}
			}
			else
			{
				if( !regexNon.test(key) || obj.value.length>10 ) {
				  theEvent.returnValue = false;
				  if(theEvent.preventDefault) theEvent.preventDefault();
				}
			}
		}
	}
}

function getElementById(root, id)
{
	var tags = new Array(root);
	var tag;
	while (tag = tags.pop())
	{
		var i;
		for (i = 0; i < tag.childNodes.length; i++)
		{
			var child = tag.childNodes[i];
			if (child.id == id) return child;
			if (child.nodeType != 1) continue;
			tags.push(child);
		}
	}
}

function getParentByTagName(tag, parentTagName)
{
	while (tag && tag.tagName != parentTagName) tag = tag.parentNode;
	return tag;
}


function hideDiv(id, element) {
	var div = document.getElementById(id);
	if (div.style.display != 'none') {
		div.style.display = 'none';
		element.className = 'close_link';
	} else {
		div.style.display = 'block';
		element.className = 'open_link';
	}	
	return false;
}

String.prototype.replaceAll = function(strTarget, strSubString)
{//Replaces all the occurrences of second string in first string
	var strText = this;
	var intIndexOfMatch = strText.indexOf( strTarget );
	while (intIndexOfMatch != -1){
		strText = strText.replace( strTarget, strSubString )	
		intIndexOfMatch = strText.indexOf( strTarget );
	}	
	return( strText );
}//end replaceAll

function IsNumeric(sText) {               
    var ValidChars = "0123456789";
	var IsNumber=true;
	var Char;           	
	for (i = 0; i < sText.length && IsNumber == true; i++){ 
		Char = sText.charAt(i); 	
		if (ValidChars.indexOf(Char) == -1) IsNumber = false;
	}
	if (sText.length<1) IsNumber = false;
	return IsNumber;
}

function IsDecimal(sText) {               
    var ValidChars = "0123456789.";
	var IsNumber=true;
	var Char;  
	if (sText.toString().split('.').length > 2) {
		IsNumber=false;
	} else {
		for (i = 0; i < sText.length && IsNumber == true; i++){ 
			Char = sText.charAt(i); 	
			if (ValidChars.indexOf(Char) == -1) IsNumber = false;
		}
	}
	if (sText.length<1) IsNumber = false;
	return IsNumber;
}

String.Format = function(text){
    if ( arguments.length <= 1 ) return text;
    var tokenCount = arguments.length - 2;
    for( var token = 0; token <= tokenCount; token++ ){
        text = text.replace( new RegExp("\\{"+token+"\\}","gi"),arguments[token+1]);
    }
    return text;
}

function GetFullDate(date) {
	var months = new Array("января", "февраля", "марта", "апреля", 
	"мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");		
	return String.Format("{0} {1} {2}", date.getDate(), months[date.getMonth()], date.getFullYear());
}

function GetDate(input) {
	var date = input.toString().split(".");
	if (date.length != 3) return 'Invalid Date';
	return String.Format("{0}/{1}/{2}", date[1], date[0], date[2]);
}

function DisplayResultsBlock(isShow) {
	if(isShow) {
		document.getElementById('resultsBlock').style.display = 'block';
	} else {
		document.getElementById('resultsBlock').style.display = 'none';
	}
}
function duplicateRow(tag)
{
	var tr = tag;
	while (tr.tagName != 'TR' && tr.parentNode) tr = tr.parentNode;
	var newTr = tr.cloneNode(true);
	//newTr.innerHTML = tr.innerHTML;
	var oldSelect = tr.getElementsByTagName('SELECT')[0];
	var newSelect = newTr.getElementsByTagName('SELECT')[0];
	var index = oldSelect.id.indexOf('_');
	var oldPrefix = index > -1 ? oldSelect.id.substr(index, oldSelect.id.length - index) : '';
	var newPrefix = '_' + new Date().valueOf();
	var rowFieldName = index > -1 ? oldSelect.id.substr(0, index) : oldSelect.id;
	var newPortions = getElementById(newTr, rowFieldName + 'Portions' + oldPrefix);
	var newTotalCalories = getElementById(newTr, rowFieldName + 'TotalCalories' + oldPrefix);
	
	newSelect.id = rowFieldName + newPrefix;
	newPortions.id = rowFieldName + 'Portions' + newPrefix;
	newPortions.value = '';
	newTotalCalories.id = rowFieldName + 'TotalCalories' + newPrefix;
	newTotalCalories.innerHTML = '';
	//newSelect.onchange = oldSelect.oldOnchange;
	
	
	var tags = newTr.getElementsByTagName('DIV');
	
	for (var i = 0; i < tags.length; i++) {
		if (tags[i].className.indexOf('_select') > -1) tags[i].parentNode.removeChild(tags[i]);
	}
	tags = newTr.getElementsByTagName('SELECT');
	for (var i = 0; i < tags.length; i++) {
		var index = tags[i].className.indexOf(' ');
		if (index > -1) tags[i].className = tags[i].className.substr(0, index);
	}
	tr.parentNode.insertBefore(newTr, tr.nextSibling);
	//srReplaceSelects(newTr);
}