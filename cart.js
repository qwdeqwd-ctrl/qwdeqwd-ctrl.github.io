function addToCart(productNum) {

  var qtyInput  = document.getElementById('qty' + productNum);
  var priceEl   = document.getElementById('price' + productNum);
  var errorEl   = document.getElementById('error' + productNum);

  var unitPrice = parseFloat(priceEl.getAttribute('data-price'));

  errorEl.classList.add('d-none');
  errorEl.textContent = '';

  var rawQty = qtyInput.value.trim();

  if (!isValidQty(rawQty)) {
    showError(errorEl, 'Invalid input - please enter a number between 1 and 10.');
    return;
  }

  var qty = parseInt(rawQty, 10);

  var confirmed = false;

  while (!confirmed) {

    var promptAnswer = prompt(
      'Please confirm the quantity of the orders you would like to add to the shopping cart'
    );

    if (promptAnswer === null) {
      return;
    }

    var trimmed = promptAnswer.trim();

    if (!isValidQty(trimmed)) {
      alert('Invalid input - please enter a number between 1 and 10.');
      continue;
    }

    var confirmedQty = parseInt(trimmed, 10);

    if (confirmedQty === qty) {
      confirmed = true;

      var total = qty * unitPrice;

      var formattedTotal = parseFloat(total.toFixed(2)).toString();

      alert(qty + ' orders have been received! The total price is $' + formattedTotal);

    } else {
      alert('Quantities do not match. Please try again.');
    }
  }
}

function isValidQty(value) {
  if (value === '' || value === null || value === undefined) return false;
  if (!/^\d+$/.test(value)) return false;
  var num = parseInt(value, 10);
  return num >= 1 && num <= 10;
}

function showError(element, message) {
  element.textContent = message;
  element.classList.remove('d-none');
}