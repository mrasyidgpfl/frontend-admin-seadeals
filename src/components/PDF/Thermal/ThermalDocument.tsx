import React from 'react';
import {
  Document, Page, StyleSheet, View, Text, Image,
} from '@react-pdf/renderer';
import JSBarcode from 'jsbarcode';
import Thermal from '../../../constants/thermal';
import dateFormatter from '../../../utils/dateFormatter';
import Logo from '../../../assets/png/logo_sea_deals.png';
import Pos from '../../../assets/png/POS_Indonesia.png';
import Jne from '../../../assets/png/JNE.png';
import Tiki from '../../../assets/png/TIKI.png';
import ThermalLeftDetail from './ThermalLeftDetail';
import ThermalRightDetail from './ThermalRightDetail';
import ThermalTableSeller from './ThermalTableProduct';

const styles = StyleSheet.create(
  {
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      fontSize: '12px',
    },
    container: {
      width: '95%',
      margin: '0 auto',
    },

    border_all: {
      border: '2px solid gray',
    },
    border_right_cut: {
      borderRight: '2px dashed gray',
    },
    border_bottom_cut: {
      borderBottom: '2px dashed gray',
    },

    content: {
      marginTop: '9px',
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

    image: {
      maxWidth: '150px',
    },

    black_bar: {
      width: '1%', backgroundColor: 'black',
    },

    subtitle: {
      fontWeight: 'bold',
      fontSize: '9px',
      width: '29%',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '24',
    },
    description: {
      fontWeight: 'bold',
      fontSize: '9px',
    },
  },
);

const ThermalDocument = ({ data }:{ data:Thermal }) => {
  let courier:any;
  let courierService:string = '';

  switch (data.courier.code) {
    case 'jne':
      courier = Jne;
      courierService = 'JNE - Reguler';
      break;
    case 'tiki':
      courier = Tiki;
      courierService = 'Tiki - Reguler';
      break;
    case 'pos':
      courier = Pos;
      courierService = 'Pos Indonesia - Reguler';
      break;
    default:
      courier = Jne;
      courierService = 'JNE - Reguler';
      break;
  }

  const canvas = document.createElement('canvas');
  JSBarcode(canvas, data?.delivery_number || 'TEST');
  const barcode = canvas.toDataURL();

  return (
    <Document>
      <Page size={[525, 625]}>

        <View style={styles.container}>
          <View style={[styles.content_row, { marginTop: '6px', marginBottom: '12px' }]}>
            <Text style={{ fontSize: '9px' }}>{dateFormatter.formatTime(data.issued_at)}</Text>
            <Text style={{ fontSize: '9px' }}>{`SeaDeals ${data.courier.name} Waybill`}</Text>
          </View>

        </View>

        <View style={[styles.container, styles.border_right_cut, styles.border_bottom_cut, { paddingBottom: '12px' }]}>

          <View style={[styles.container, styles.content_column, styles.border_all]}>
            <View
              style={[
                styles.content_row,
                styles.border_bottom_cut,
                { padding: '6px' },
              ]}
            >
              <View style={[styles.content_column, { width: '25%' }]}>
                <Image src={Logo} style={{ maxHeight: '25px', marginRight: '15%' }} />
                <Image src={courier} style={{ maxHeight: '35px', marginRight: '50%' }} />
              </View>
              <Image src={barcode} style={{ width: '45%', height: '70px' }} />
              <Text style={[styles.title, { width: '25%' }]}>
                {`${data.origin_city.substring(0, 3).toUpperCase()}-${data.buyer.city.substring(0, 3).toUpperCase()}`}
              </Text>
            </View>

            <View style={[
              styles.content_row,
              { paddingTop: '9px' },
            ]}
            >
              <ThermalLeftDetail
                buyer={data.buyer}
                sellerName={data.seller_name}
                totalWeight={data.total_weight}
                courierService={courierService}
              />
              <View style={styles.black_bar} />
              <ThermalRightDetail thermal={data} />
            </View>
          </View>

        </View>

        <View style={[styles.container, styles.border_right_cut, { paddingTop: '12px' }]}>
          <View style={[styles.container, styles.content_column]}>
            <View style={styles.content_row}>
              <Text>Daftar Produk</Text>
              <Text>{`NO.PESANAN   ${data.delivery_number}`}</Text>
            </View>

            <ThermalTableSeller products={data.products} />

          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ThermalDocument;
