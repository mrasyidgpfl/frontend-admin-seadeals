import React from 'react';
import CardStatistic from '../../../../components/Card/CardStatistic';

const StatsVoucher = () => (
  <div className="container text-start">
    <h5 className="mb-2">Statistik Voucher</h5>
    <div className="row">
      <div className="col-12 col-md-4 my-2">
        <CardStatistic title="Penjualan" data="Rp 40.000.000" tooltip="Nilai total dari semua pesanan siap dikirim menggunakan Voucher yang ditanggung oleh Penjual, termasuk ongkos kirim dan tidak termasuk promosi lainnya, selama periode waktu yang dipilih." />
      </div>
      <div className="col-12 col-md-4 my-2">
        <CardStatistic title="Pesanan" data="131" tooltip="Jumlah voucher yang ditanggung Penjual yang digunakan pada pesanan selama jangka waktu tertentu." />
      </div>
      <div className="col-12 col-md-4 my-2">
        <CardStatistic title="Pembeli" data="120" tooltip="Jumlah Pembeli yang menggunakan setidaknya 1 voucher yang ditanggung Penjual pada pesanan selama jangka waktu tertentu." />
      </div>
    </div>
  </div>
);
export default StatsVoucher;
