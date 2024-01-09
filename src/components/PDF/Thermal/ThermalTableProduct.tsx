import React from 'react';
import {
  StyleSheet, View,
} from '@react-pdf/renderer';
import ThermalHeaderProductTable from './ThermalHeaderProduct';
import ThermalItemProductTable from './ThermalItemProduct';
import { ProductDetailThermal } from '../../../constants/thermal';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '24px 0',
  },
});

const ThermalTableProduct = ({ products }:{ products:Array<ProductDetailThermal> }) => (
  <View style={styles.tableContainer}>
    <ThermalHeaderProductTable />
    {products && products.map((product, idx) => (
      <ThermalItemProductTable product={product} idx={idx} key={product.id} />
    ))}
  </View>
);

export default ThermalTableProduct;
