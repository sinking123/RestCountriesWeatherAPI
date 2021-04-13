// Create a element
function create_element(element_name, class_name) {
  let element = document.createElement(element_name);
  element.setAttribute("class", class_name);
  return element;
}

// Creating Card
let create_card = (country) => {
  let card = create_element(
      "div",
      "card col col-lg-4 col-sm-12 m-5 p-3 bg-primary"
    ),
    img = create_element("img", "card-img-top"),
    btn = create_element("input", "btn btn-outline-warning w-50 m-4 p-2");

  card.appendChild(
    create_element("div", "card-header header").appendChild(
      document.createTextNode(country.name)
    )
  );

  // Image attributes
  img.setAttribute("src", country.flag);
  card.appendChild(img);

  // Button attributes
  btn.type = "BUTTON";
  btn.value = "Click for Weather";
  btn.addEventListener("click", () => {
    weather_api(country.capital, card);
  });

  let content_text = create_element("p", "mt-2");
  content_text.innerHTML =
    "Capital : " +
    country.capital +
    "</br>" +
    "Region : " +
    country.region +
    "</br>" +
    "Country Code : " +
    country.alpha2Code;

  card.appendChild(content_text);
  card.appendChild(btn);

  return card;
};

// FETCH API
fetch("https://restcountries.eu/rest/v2/all")
  .then((res) => res.json())
  .then((data) => {
    let countries_data = Object.values(data),
      row_div = create_element("div", "row ml-5 pl-4");

    for (let i = 0; i < countries_data.length; i++) {
      if (i % 3 == 0) {
        document.body.append(row_div);
        row_div = create_element("div", "row ml-3 pl-4");
      }

      row_div.appendChild(create_card(countries_data[i]));
    }
  })
  .catch(console.error());

// WEATHER API
async function weather_api(country_name, card) {
  let url = "http://api.openweathermap.org/data/2.5/weather?q=",
    API_KEY = "&appid=10243494bf3738c4dfa7c7a7157f15a7";
  let weather_data = await fetch(url + country_name + API_KEY).then((data) =>
    data.json()
  );
  weather_data = weather_data.weather[0];
  let img = create_element("img", "weather_img");
  img.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + weather_data.icon + "@2x.png"
  );
  let weather_title = create_element("p", "weather_title font-weight-light");
  weather_title.innerHTML = weather_data.description;
  card.appendChild(weather_title);
  card.appendChild(img);
}
