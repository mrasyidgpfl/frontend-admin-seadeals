import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import Thermal from '../../../constants/thermal';

const styles = StyleSheet.create(
  {
    container: {
      width: '95%',
      margin: '0 auto',
    },

    content_row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    content_row_flex_start: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
    },
    content_column: {
      flexDirection: 'column',
    },
    content_table: {
      flexDirection: 'column',
      display: 'flex',
    },

    black_bar: {
      width: '1%', backgroundColor: 'black',
    },

    subtitle: {
      fontWeight: 'bold',
      fontSize: '9px',
    },
    description: {
      fontWeight: 'bold',
      fontSize: '9px',
    },
  },
);

const ThermalRightDetail = ({ thermal }:{ thermal:Thermal }) => (
  <View style={[styles.content_column, { width: '47%' }]}>
    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <Text style={{ fontSize: '12px' }}>No. Pesanan: </Text>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '70%',
      }]}
      >
        <Text style={{ fontSize: '12px' }}>
          {'  '}
          {thermal.delivery_number}
        </Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '30%',
      }]}
      >
        <Text style={[styles.subtitle]}>Asal</Text>
        <Text style={[styles.subtitle]}>Tujuan</Text>
      </View>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>{thermal.origin_city.toUpperCase()}</Text>
        <Text style={[styles.description, { marginLeft: '12px' }]}>{thermal.buyer.city.toUpperCase()}</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '30%',
      }]}
      >
        <Text style={[styles.subtitle]}>Biaya</Text>
      </View>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>{`Asuransi: ${0}`}</Text>
        <Text style={[styles.description, { marginLeft: '12px' }]}>{`Biaya Kirim: ${thermal.price}`}</Text>
        <Text style={[styles.description, { marginLeft: '12px' }]}>{`Total: ${thermal.price}`}</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '30%',
      }]}
      >
        <Text style={[styles.subtitle]}>Keterangan</Text>
      </View>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>Sumber: SeaDeals</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '30%',
      }]}
      >
        <Text style={[styles.subtitle]}>Tanda Tangan</Text>
      </View>
    </View>

    {/* SIGNATURE LOCATION */}
    <View style={{ height: '50px' }} />
  </View>
);

export default ThermalRightDetail;
