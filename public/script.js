// Retrieve expenses from the API
const getExpenses = () => {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: '/expenses',
    success: function (data) {
      console.log('Expenses returned successfully!');
      renderExpenses(data.expenses);
    },
    error: function (error) {
      console.error('There was some kind of error.');
    }
  });
};


// Render expenses to the DOM
const renderExpenses = (expenses) => {
  const tableBody = $('#expenses-data tbody');
  expenses.forEach(expense => {
    const tableRow = document.createElement('tr');
    $(tableRow).addClass(expense.category);
    $(tableRow).append(`<td>${expense.category}</td>`);
    $(tableRow).append(`<td>${expense.description}</td>`);
    $(tableRow).append(`<td>${expense.cost}</td>`);
    tableBody.append(tableRow);
  });
};


// Highlight expenses that match the selected category
$('#highlight-category').on('change', (e) => {

  // Remove any pre-existing highlights
  $('#expenses-data').find('tr').removeClass('highlighted');

  // Get the currently selected category and find matching table rows
  const selectedCategory = $(e.currentTarget).val();
  const matches = $('#expenses-data').find(`tr.${selectedCategory.toLowerCase()}`);

  // Add a highlight class to all matches
  matches.each((index, match) => {
    $(match).addClass('highlighted');
  });
});


$(document).ready(() => {
  getExpenses();
});
