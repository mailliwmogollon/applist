import React, { useState } from 'react';
import Button from '../../components/button';
import Title from '../../components/title';
import ContentContainer from '../../components/content-container';
import AddForm from '../../components/add-form';
import Navigation from '../../components/routing/Navigation';
import { addProduct } from '../../utils/firebaseUtils';

//Hooks
import { useProducts } from '../../hooks/useProducts';

import './styles.css';

export const AddItemPage = () => {
  const { products } = useProducts();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [formState, setFormState] = useState({
    productName: '',
    timeFrame: '7',
    lastPurchaseDate: null,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(products);
    /*
    Checks the state if the product already exists
    Find returns undefined if it has not matches
    */
    const normalizer = (input) => input.toUpperCase().replaceAll(/[.,:;]/g, '');
    const checkProduct = products.find(
      (product) =>
        normalizer(product.productName) === normalizer(formState.productName),
    );
    /*
    We have to compare explicitely if it is undefined, otherwise
    it wouldn't work as expected
    */
    if (checkProduct === undefined) {
      addProduct(formState)
        .then((res) => console.log(res))
        .catch(() => setError(true))
        .finally(() => {
          setIsLoading(false);
          console.log(formState.productName);
          setFormState({
            productName: '',
            timeFrame: '7',
            lastPurchaseDate: null,
          });
        });
    } else {
      setIsLoading(false);
      setError(true);
    }
    setMessage(
      error
        ? 'It seems you have already added this product. Try another one.'
        : 'Successfully created product!',
    );

    setTimeout(() => setMessage(null), 3000);
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };

  return (
    <>
      <Title>Add Item</Title>
      <ContentContainer>
        <form onSubmit={onSubmit} className="add-form">
          <AddForm handleForm={handleForm} formState={formState} />
          <Button type="submit" disabled={formState.productName === ''}>
            Add Item
          </Button>
        </form>

        {isLoading ? <p>Adding product...</p> : null}
        {message ? <p>{message}</p> : null}
      </ContentContainer>
      <Navigation />
    </>
  );
};
