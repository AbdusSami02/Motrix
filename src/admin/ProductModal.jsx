// Popup form for adding or editing a product.
// form is the product being edited, setForm updates it, onCancel closes the popup.
export default function ProductModal({ form, setForm, onSave, onCancel }) {
  // returns an onChange handler for one field of the form
  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  // read the chosen image file and store it in the form as a base64 data URL
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()

    reader.onload = () => setForm((current) => ({ ...current, img: reader.result }))
    if (file) reader.readAsDataURL(file)
  }

  return (
    <div className="modal">
      <form className="panel acard" onSubmit={onSave}>
        <h3>{form.id ? 'EDIT' : 'ADD'} PRODUCT</h3>

        <label>
          Brand
          <input required value={form.brand} onChange={updateField('brand')} />
        </label>
        <label>
          Name
          <input required value={form.name} onChange={updateField('name')} />
        </label>
        <label>
          Price
          <input
            required
            type="number"
            step="0.01"
            value={form.price}
            onChange={updateField('price')}
          />
        </label>
        <label>
          Stock
          <input required type="number" value={form.stock} onChange={updateField('stock')} />
        </label>
        <label>
          Image URL
          <input value={form.img} onChange={updateField('img')} />
        </label>
        <label>
          Or upload
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>

        <div className="row">
          <button className="btn dark">Save</button>
          <button type="button" className="btn light" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
