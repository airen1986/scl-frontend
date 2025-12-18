// Model selection: highlight chosen model in the Models list
document.addEventListener('DOMContentLoaded', () => {
	
	const modelsCard = document.getElementById('modelList');
	if (!modelsCard) return;

	const items = modelsCard.querySelectorAll('.list-group .list-group-item');
	if (!items.length) return;

	items.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			// Remove selection from all
			items.forEach((i) => i.classList.remove('active'));
			// Add selection to clicked
			item.classList.add('active');
		});
	});
});