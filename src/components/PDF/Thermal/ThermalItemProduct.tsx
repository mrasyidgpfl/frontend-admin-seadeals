import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import { ProductDetailThermal } from '../../../constants/thermal';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottom: '1 solid gray',
    alignItems: 'flex-start',
    height: 24,
    fontStyle: 'bold',
    flexGrow: 1,
    fontSize: '12px',
  },
  numbering: {
    width: '2%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
  sku_induk: {
    width: '8%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
  product_name: {
    width: '35%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
  sku: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
  variant: {
    width: '25%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
  qty: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
    fontSize: '9px',
  },
});

const ThermalItemProductTable = ({ product, idx }:{ product:ProductDetailThermal, idx:number }) => (
  <View style={styles.container}>
    <Text style={styles.numbering}>{idx + 1}</Text>
    <Text style={styles.sku_induk} />
    <Text style={styles.product_name}>{product.name}</Text>
    <Text style={styles.sku} />
    <Text style={styles.variant}>{product.variant}</Text>
    <Text style={styles.qty}>{product.quantity}</Text>
  </View>
);

export default ThermalItemProductTable;
