import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { saveBooking } from '../services/storage';

export default function BookingScreen({ route, navigation }) {
  const { doctor } = route.params;
  const [complaint, setComplaint] = useState('');

  const handleConfirmBooking = async () => {
    if (!complaint.trim()) {
      Alert.alert('Peringatan', 'Silakan tuliskan keluhan atau gejala yang Anda rasakan.');
      return;
    }

    const bookingData = {
      id: Date.now().toString(),
      doctorName: doctor.name,
      specialty: doctor.specialty,
      complaint: complaint,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    };

    await saveBooking(bookingData);
    Alert.alert('Booking Berhasil', 'Jadwal konsultasi Anda telah tersimpan di sistem klinik.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text style={styles.title}>Konfirmasi Booking Konsultasi</Text>

        {/* Card Summary Dokter */}
        <View style={styles.doctorSummaryCard}>
          <Text style={styles.summaryBadge}>Dokter Pilihan</Text>
          <Text style={styles.docName}>{doctor.name}</Text>
          <Text style={styles.docSpec}>{doctor.specialty}</Text>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Biaya Konsultasi:</Text>
            <Text style={styles.priceVal}>{doctor.price}</Text>
          </View>
        </View>

        {/* Input Keluhan */}
        <View style={styles.formCard}>
          <Text style={styles.label}>Tuliskan Keluhan / Gejala Medis *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Jelaskan secara singkat gejala yang dialami (contoh: demam, nyeri tenggorokan sejak kemarin)..."
            placeholderTextColor="#94a3b8"
            value={complaint}
            onChangeText={setComplaint}
            multiline
            numberOfLines={5}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleConfirmBooking} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>Konfirmasi & Simpan Jadwal</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  title: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginBottom: 16 },
  doctorSummaryCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#bae6fd', elevation: 2 },
  summaryBadge: { color: '#0284c7', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  docName: { fontSize: 17, fontWeight: '800', color: '#0f172a' },
  docSpec: { fontSize: 13, color: '#64748b', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 14 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  priceLabel: { color: '#475569', fontSize: 13, fontWeight: '600' },
  priceVal: { color: '#15803d', fontSize: 16, fontWeight: '800' },
  formCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20, elevation: 2 },
  label: { fontSize: 13, fontWeight: '700', color: '#0f172a', marginBottom: 10 },
  textArea: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 14, height: 120, textAlignVertical: 'top', color: '#0f172a', fontSize: 14, marginBottom: 20 },
  submitBtn: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  submitBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 }
});