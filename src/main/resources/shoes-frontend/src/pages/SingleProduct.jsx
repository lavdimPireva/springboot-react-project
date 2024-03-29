import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 500,
    height: 800,
    margin: "0 auto",
    marginTop: 20,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ccc",
  },
  media: {
    height: 50,
    paddingTop: "56.25%", // 16:9
  },
  content: {
    textAlign: "center",
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  addToCartButton: {
    marginTop: 40,
    marginLeft: 190,
    padding: "10px 5px",
    paddingTop: "10px",
    width: "150px",
    height: "40px",
  },

  title: {
    padding: theme.spacing(2),
  },
  numberContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
}));

const SingleProduct = () => {
  const classes = useStyles();
  const location = useLocation();
  const { image, name, description, price, discountPrice } = location.state;
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  const series = getSeries(name);

  function getSeries(name) {
    if (name.startsWith("ZX")) {
      return [40, 41, 42, 43, 44];
    } else if (name.startsWith("Dragon") || name.startsWith("New")) {
      return [39, 40, 41, 42, 43, 44];
    } else if (name.startsWith("Reebok") || name.startsWith("Alexander")) {
      return [36, 37, 38, 39, 40, 41, 42, 43, 44];
    }
  }

  const handleSeriesSelection = (seriesNumber) => {
    setSelectedSeries(seriesNumber);
    console.log("Selected series:", seriesNumber);
  };

  const handleAddToCart = () => {
    setCount(count + 1);

    if (selectedSeries) {
      const item = { name, price, selectedSeries };

      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      console.log("cart items", cartItems);

      if (cartItems != null) {
        console.log("Cart Items is not null");
        cartItems = [];
      }
      cartItems.push(item);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  };

  const handleCart = () => {
    navigate("/cart", { state: { selectedSeries } });
  };

  return (
    <>
      <Navbar />
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {price}€
          </Typography>
        </CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          component="h2"
          gutterBottom
        >
          Zgjedh numrin e kembes
        </Typography>
        <div className={classes.numberContainer}>
          {series.map((number) => (
            <Button
              variant={number === selectedSeries ? "contained" : "outlined"}
              color={number === selectedSeries ? "primary" : "default"}
              onClick={() => handleSeriesSelection(number)}
              key={number}
            >
              {number}
            </Button>
          ))}
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.addToCartButton}
          onClick={() => handleAddToCart()}
        >
          Shto ne Shport ({count})
        </Button>

        <Button
          variant="contained"
          color="primary"
          className={classes.addToCartButton}
          onClick={() => handleCart()}
        >
          Shiko Shporten
        </Button>
      </Card>
      <Footer />
    </>
  );
};

export default SingleProduct;
