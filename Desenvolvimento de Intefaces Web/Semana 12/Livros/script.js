document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/book')
    .then(response => response.json())
    .then(books => {
      const container = document.getElementById('books-container');
      books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
          <div class="card h-100">
            <img src="${book.image}" class="card-img-top" alt="${book.title}">
            
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.description}</p>
              <p class="card-text"><small class="text-muted">${book.additionalDetail}</small></p>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
});