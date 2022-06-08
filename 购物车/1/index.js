//1.选择框，全选|反选 功能
//2.选择以后，小计相加放入到（合计中）
window.onload = function() {
	var check = getClass("check");
	var priceTotal = document.getElementById("priceTotal");
	var selectedTotal = document.getElementById("selectedTotal");
	var tbody = document.getElementById("tbody");
	var tr = tbody.getElementsByTagName('tr');
	for (var i = 0; i < check.length; i++) {
		check[i].onclick = function() {
			if (this.className == "check-all check") {
				for (var j = 0; j < check.length; j++) {
					check[j].checked = this.checked
				}
			}
			getTotal();
		}
	}
	//事件委托
	for (var i = 0; i < tr.length; i++) {
		tr[i].onclick = function(e) {
			var e = window.event || e;
			var target = e.target || e.srcElement; //兼容
			var input1 = this.getElementsByTagName('input')[1];
			switch (target.className) {
				case 'add':
					input1.value = parseInt(input1.value) + 1;
					break;
				case 'reduce':
					if (input1.value <= 1) {
						input1.value = 1;
					} else {
						input1.value -= 1;
					}

					break;
				case 'delete':
					tbody.removeChild(target.parentNode.parentNode); //span-td-tr
					break;

			}
			getTotal();
		}
	}

}

//合计、已选商品件数
function getTotal() {
	var tbody = document.getElementById('tbody');
	var tr = tbody.getElementsByTagName('tr');
	var price = 0;
	var selected = 0
	for (var i = 0; i < tr.length; i++) {
		var input = tr[i].getElementsByTagName('input');
		if (input[0].checked) { //判断是否是选中
			var td2 = tr[i].getElementsByTagName('td')[2].innerText;
			var td4 = tr[i].getElementsByTagName('td')[4];
			var numCount = parseInt(input[1].value);
			td4.innerText = numCount * td2;
			
			price += parseInt(tr[i].getElementsByTagName('td')[4].innerText);
			selected += parseInt(input[1].value);
		}
	}
	priceTotal.innerText = price;
	selectedTotal.innerText = selected;
}

//获取class名称的
function getClass(cName) {
	var doms = document.getElementsByTagName("*");
	var domArr = [];
	for (var i = 0; i < doms.length; i++) {
		if (doms[i].className == cName || doms[i].className.indexOf('' + cName) != -1 || doms[i].className.indexOf(cName +
				" ") != -1) {
			domArr.push(doms[i]);
		}
	}
	return domArr;

}
