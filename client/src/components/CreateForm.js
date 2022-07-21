export default function CreateForm() {
  return (
    <div className="container">
      <form>
        <div className="form-group row">
          <label for="text" className="col-4 col-form-label">
            Text Field
          </label>
          <div className="col-8">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">
                  <i className="fa fa-address-card" />
                </div>
              </div>
              <input
                id="text"
                name="text"
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="offset-4 col-8">
            <button name="submit" type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
