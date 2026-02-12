(() => {
  const pcListEl = document.getElementById('pcList');
  const emptyMessageEl = document.getElementById('emptyMessage');
  const modal = document.getElementById('pcModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const submitBtn = document.getElementById('submitBtn');

  const priceFilter = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const conditionFilter = document.getElementById('conditionFilter');
  const usageFilter = document.getElementById('usageFilter');
  const sortFilter = document.getElementById('sortFilter');

  // Form inputs
  const pcName = document.getElementById('pcName');
  const pcImage = document.getElementById('pcImage');
  const pcPrice = document.getElementById('pcPrice');
  const pcDesc = document.getElementById('pcDesc');
  const pcCondition = document.getElementById('pcCondition');
  const pcUsage = document.getElementById('pcUsage');

  let pcs = [];

  // Load saved PCs from localStorage
  function loadPCs() {
    const saved = localStorage.getItem('pcs');
    if (saved) pcs = JSON.parse(saved);
  }

  // Save PCs to localStorage
  function savePCs() {
    localStorage.setItem('pcs', JSON.stringify(pcs));
  }

  // Render PC list with filters and sorting
  function renderPCs() {
    // Filter by price, condition, usage
    let filtered = pcs.filter(pc => {
      const matchPrice = pc.price <= Number(priceFilter.value);
      const matchCondition = conditionFilter.value === 'all' || pc.condition === conditionFilter.value;
      const matchUsage = usageFilter.value === 'all' || pc.usage === usageFilter.value;
      return matchPrice && matchCondition && matchUsage;
    });

    // Sort
    if (sortFilter.value === 'newest') {
      filtered.sort((a,b) => b.addedAt - a.addedAt);
    } else if (sortFilter.value === 'oldest') {
      filtered.sort((a,b) => a.addedAt - b.addedAt);
    } else if (sortFilter.value === 'cheapest') {
      filtered.sort((a,b) => a.price - b.price);
    }

    pcListEl.innerHTML = '';

    if (filtered.length === 0) {
      emptyMessageEl.style.display = 'block';
      return;
    } else {
      emptyMessageEl.style.display = 'none';
    }

    filtered.forEach((pc, i) => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${pc.img}" alt="${pc.name}" />
        <div class="card-body">
          <h3>${pc.name}</h3>
          <div class="price">DH ${pc.price.toLocaleString()}</div>
          <div class="desc">${pc.desc || ''}</div>
          <div><strong>Condition:</strong> ${pc.condition}</div>
          <div><strong>Usage:</strong> ${pc.usage}</div>
        </div>
        <div class="card-footer">
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        </div>
      `;

      const editBtn = card.querySelector('.btn-edit');
      const deleteBtn = card.querySelector('.btn-delete');

      editBtn.addEventListener('click', () => editPC(i));
      deleteBtn.addEventListener('click', () => deletePC(i));

      pcListEl.appendChild(card);
    });
  }

  // Clear and hide modal
  function closeModal() {
    modal.classList.remove('active');
    pcName.value = '';
    pcImage.value = '';
    pcPrice.value = '';
    pcDesc.value = '';
    pcCondition.value = 'New';
    pcUsage.value = 'Gaming';
    resetSubmitButton();
  }

  // Open modal
  openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  // Cancel modal
  cancelBtn.addEventListener('click', () => {
    closeModal();
  });

  // Add new PC
  submitBtn.addEventListener('click', () => {
    const name = pcName.value.trim();
    const img = pcImage.value.trim();
    const price = Number(pcPrice.value);
    const desc = pcDesc.value.trim();
    const condition = pcCondition.value;
    const usage = pcUsage.value;

    if (!name || !img || !price || price < 0) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    pcs.push({
      name,
      img,
      price,
      desc,
      condition,
      usage,
      addedAt: Date.now(),
    });

    savePCs();
    renderPCs();
    closeModal();
  });

  // Delete PC
  function deletePC(index) {
    if (confirm('Delete this PC build?')) {
      pcs.splice(index, 1);
      savePCs();
      renderPCs();
    }
  }

  // Edit PC (basic: load data to modal, update on submit)
  function editPC(index) {
    const pc = pcs[index];
    pcName.value = pc.name;
    pcImage.value = pc.img;
    pcPrice.value = pc.price;
    pcDesc.value = pc.desc;
    pcCondition.value = pc.condition;
    pcUsage.value = pc.usage;

    modal.classList.add('active');

    submitBtn.textContent = 'Update Build';

    const newSubmit = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmit, submitBtn);

    newSubmit.addEventListener('click', () => {
      const name = pcName.value.trim();
      const img = pcImage.value.trim();
      const price = Number(pcPrice.value);
      const desc = pcDesc.value.trim();
      const condition = pcCondition.value;
      const usage = pcUsage.value;

      if (!name || !img || !price || price < 0) {
        alert('Please fill in all required fields correctly.');
        return;
      }

      pcs[index] = {
        name,
        img,
        price,
        desc,
        condition,
        usage,
        addedAt: pc.addedAt,
      };

      savePCs();
      renderPCs();
      closeModal();
    });
  }

  // Reset submit button to Add Build and normal listener
  function resetSubmitButton() {
    const originalBtn = document.getElementById('submitBtn');
    const newBtn = originalBtn.cloneNode(true);
    originalBtn.parentNode.replaceChild(newBtn, originalBtn);
    newBtn.textContent = 'Add Build';

    newBtn.addEventListener('click', () => {
      const name = pcName.value.trim();
      const img = pcImage.value.trim();
      const price = Number(pcPrice.value);
      const desc = pcDesc.value.trim();
      const condition = pcCondition.value;
      const usage = pcUsage.value;

      if (!name || !img || !price || price < 0) {
        alert('Please fill in all required fields correctly.');
        return;
      }

      pcs.push({
        name,
        img,
        price,
        desc,
        condition,
        usage,
        addedAt: Date.now(),
      });

      savePCs();
      renderPCs();
      closeModal();
    });
  }

  // Update price slider label
  priceFilter.addEventListener('input', () => {
    priceValue.textContent = 'DH ' + priceFilter.value;
    renderPCs();
  });

  // Filter and sort event listeners
  conditionFilter.addEventListener('change', renderPCs);
  usageFilter.addEventListener('change', renderPCs);
  sortFilter.addEventListener('change', renderPCs);

  // Initialize
  loadPCs();
  renderPCs();
})();