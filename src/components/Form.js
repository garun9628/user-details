import React, { useState, useEffect, useRef } from "react";

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    contact: "",
    email: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [articles, setArticles] = useState([]);
  const [states, setStates] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // handle onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    // to prevent the page from reloading
    e.preventDefault();
    setValidationErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(validationErrors);
    if (Object.keys(validationErrors).length === 0 && isSubmit) {
      console.log({ Success: "All fields are valid" });
    }
  }, [validationErrors]);

  //validation function to check errors
  const validate = (formValues) => {
    const { name, email, contact } = formValues;
    let errors = {};

    //Name validation
    if (!name) {
      errors.name = {
        error: "Name is required",
      };
    } else if (name.length < 4 || name.length > 10) {
      errors.name = {
        error: "Length should be in between 4-10 characters",
      };
    }

    // email validation
    const emailCond =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

    if (email.length > 0 && !email.match(emailCond)) {
      errors.email = {
        error: "Invalid email address",
      };
    }

    if (contact.length > 0 && contact.length < 10) {
      errors.contact = {
        error: "Contact number should be of 10 digits",
      };
    }

    return errors;
  };

  const getAllCountries = async () => {
    // Api call
    const response = await fetch(
      `https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json`
    );
    const json = await response.json();
    setArticles(json);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      return;
    }

    let data = articles.filter((country) => {
      return country.name == selectedCountry;
    });
    if (data.length > 0) {
      setStates(data[0].states);
    }
  }, [selectedCountry]);

  return (
    <>
      <div
        className="my-5"
        style={{ width: "45%", marginLeft: "auto", marginRight: "auto" }}
      >
        <h3>Can you please provide your personal details?</h3>
      </div>
      <div
        style={{
          width: "50%",
          margin: "0px auto",
          backgroundColor: "aliceblue",
        }}
      >
        <form
          style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="form-label my-3">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              min="1950-01-01"
              max="2030-12-31"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              pattern="[0-9]{10}"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country">Country</label>
            <div className="d-flex" style={{ position: "relative" }}>
              <input
                className="form-control"
                id="country"
                name="country"
                list="countries"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormValues({ ...formValues, [name]: value });
                  setSelectedCountry(e.target.value);
                }}
                required
              />
              <datalist id="countries">
                {articles.map((country) => {
                  return (
                    <option key={country.name} value={country.name}></option>
                  );
                })}
              </datalist>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="Country" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              list="states"
              required
            />

            <datalist id="states">
              {states &&
                states.map((state) => {
                  return <option key={state.code} value={state.name}></option>;
                })}
            </datalist>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control mb-3"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
