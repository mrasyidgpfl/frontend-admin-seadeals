import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
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

const ThermalHeaderProductTable = () => (
  <View style={styles.container}>
    <Text style={styles.numbering}>#</Text>
    <Text style={styles.sku_induk}>SKU Induk</Text>
    <Text style={styles.product_name}>Nama Produk</Text>
    <Text style={styles.sku}>SKU</Text>
    <Text style={styles.variant}>Variasi</Text>
    <Text style={styles.qty}>Qty</Text>
  </View>
);

export default ThermalHeaderProductTable;
