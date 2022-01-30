const onSubmit = () => {
    const location = document.getElementById("location").value;
    if(location) {
        if(document.getElementById("help_block"))document.getElementById("help_block").style.display = "none";
        fetch("http://localhost:3000/weather?address="+location).then((response) => {
            response.json().then((data) => {
                console.log(data);
                if(data.error) {
                    console.log(data.error);
                    return;
                }
                const forecast = data.forecast;
                const location = data. location;
                document.getElementById("forecast_message").innerHTML = '<strong>Success! </strong>' + location + " Forecast : " + forecast;
            });
        });
    }
    else {
        document.getElementById("help_block").style.display = "block";
    }
};