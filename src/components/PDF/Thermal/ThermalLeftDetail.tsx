import { StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { UserDetailThermal } from '../../../constants/thermal';

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
      width: '29%',
    },
    description: {
      fontWeight: 'bold',
      fontSize: '9px',
    },
  },
);

const ThermalLeftDetail = ({
  buyer, sellerName, totalWeight, courierService,
}:{ buyer:UserDetailThermal, sellerName:string, totalWeight:number, courierService:string }) => (
  <View style={[styles.content_column, { width: '47%' }]}>
    <View style={[styles.content_row_flex_start, styles.container]}>
      <Text style={styles.subtitle}>Penerima</Text>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>{buyer.name}</Text>
        <Text style={[styles.description, { marginLeft: '12px', marginTop: '12px' }]}>{buyer.address}</Text>
        <Text style={[styles.description, { marginLeft: '12px', marginTop: '12px' }]}>{buyer.city}</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <Text style={styles.subtitle}>Pengirim</Text>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>{sellerName}</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <Text style={styles.subtitle}>Total Berat</Text>
      <View style={styles.black_bar} />
      <View style={[styles.content_column, {
        textAlign: 'left', width: '65%',
      }]}
      >
        <Text style={[styles.description, { marginLeft: '12px' }]}>{`${totalWeight}gr`}</Text>
      </View>
    </View>

    <View style={[styles.content_row_flex_start, styles.container, { marginTop: '12px' }]}>
      <Text style={{ width: '25%', fontSize: '12px' }}>Penting: </Text>
      <View style={[styles.content_column, {
        textAlign: 'left', width: '70%',
      }]}
      >
        <Text style={styles.description}>
          {'Silahkan atur pengiriman melalui aplikasi SeaDeals untuk layanan.'
                + `Jangan membayarkan ongkir apapun ke ${courierService}, ongkir akan `
                + 'dibayarkan langsung oleh SeaDeals'}
        </Text>
      </View>
    </View>
  </View>
);
export default ThermalLeftDetail;
