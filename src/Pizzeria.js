import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { red, yellow } from '@material-ui/core/colors';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

import CurrencyUsd from '@material-ui/icons/AttachMoney';
import CurrencyEur from '@material-ui/icons/Euro';

import { PizzaContext } from './PizzaContext';
import { CartContext } from './CartContext';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        The Yummi Pizza Co.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(${'./pizzabg.png'})`,
    backgroundSize: 'cover',
    color: yellow.A200,
  },
  heroFont: {
    fontFamily: 'Leckerli One, cursive',
    textShadow: '2px 2px 2px black',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActionButtons: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  footer: {
    backgroundColor: red[400],
    padding: theme.spacing(6),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Pizzeria() {
  const classes = useStyles();

  const { pizzas, currency } = useContext(PizzaContext);
  const { cart, addToCart, total } = useContext(CartContext);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom className={classes.heroFont}>
              The Yummi Pizza
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Order some yummi pizzas!
            </Typography>
          </Container>
        </div>

        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {pizzas.map((pizza) => (
              <Grid item key={pizza.id} xs={12} sm={6} md={4}>
                <Card className={classes.card} align="left">
                  <CardMedia className={classes.cardMedia} image="./pizza1.png" title="Our Yummi Pizza.. Mmm.."/>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Meal {pizza.id}: {pizza.name}
                    </Typography>
                    <Typography>
                      {pizza.description}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActionButtons}>
                    <Button size="medium" color="secondary">
                      {
                        (currency === "usd")
                          ? <CurrencyUsd />
                          : <CurrencyEur />
                      }
                      {
                        (currency === "usd")
                        ? pizza.priceusd
                        : pizza.price
                      }
                    </Button>
                    <Button
                      onClick={() => { addToCart(
                        {
                          id: pizza.id,
                          name: pizza.name,
                          price: parseInt(pizza.price),
                          amount: 1
                        }
                      ); }}
                      size="medium"
                      variant="contained"
                      color="secondary"
                      startIcon={<ShoppingBasket />}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          The Yummi Pizza Co.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We love pizzas!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}