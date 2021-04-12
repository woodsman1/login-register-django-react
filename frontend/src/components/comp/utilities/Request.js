const add_to_localstorage = (key, data) => {
  localStorage.setItem(key, data[key]);
};


const onLogin = async (obj, setAuthenticated) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();

    setAuthenticated(true);
    add_to_localstorage("refresh", data);
    add_to_localstorage("access", data);
    add_to_localstorage("email", data);

    return true

  } catch (err) {
    alert("Enter Correct Username and Password, " +err);
    return false
  }
};

const onSignUp = async (obj, setAuthenticated) => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`bad request ${res.status}`);
        }
      })
      .catch(console.error);

    const data = await res.json();

    if (data["created"] == 0) {
      alert(data["error"]);
      return false

    } else {
      setAuthenticated(true);
      
      add_to_localstorage("refresh", data);
      add_to_localstorage("access", data);
      add_to_localstorage("email", data);
      return true
    }

  } catch (err) {
    alert("Enter Correct Username and Password, "+err );
    return false
  }
};

export { onLogin };
export { onSignUp };
