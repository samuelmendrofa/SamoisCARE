import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView, Image } from 'react-native';

const DUMMY_DOCTORS = [
  { id: '1', name: 'Dr. Budi Santoso, Sp.PD', specialty: 'Spesialis Penyakit Dalam', rating: '4.9', experience: '8 Tahun', price: 'Rp 150.000', icon: '👨‍⚕️' },
  { id: '2', name: 'Dr. Siti Rahmawati, Sp.A', specialty: 'Spesialis Anak', rating: '4.8', experience: '6 Tahun', price: 'Rp 130.000', icon: '👩‍⚕️' },
  { id: '3', name: 'Dr. Andi Wijaya, Sp.OG', specialty: 'Spesialis Kandungan', rating: '5.0', experience: '12 Tahun', price: 'Rp 200.000', icon: '👨‍⚕️' },
  { id: '4', name: 'Dr. Maya Putri, Sp.KJI', specialty: 'Spesialis Kedokteran Jiwa', rating: '4.7', experience: '5 Tahun', price: 'Rp 180.000', icon: '👩‍⚕️' },
];

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoctors(DUMMY_DOCTORS);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerLoading}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={{ marginTop: 12, color: '#64748b', fontWeight: '600' }}>Memuat daftar dokter spesialis...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Banner Top Info */}
      <View style={styles.banner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTag}>Layanan Konsultasi</Text>
          <Text style={styles.bannerTitle}>Klinik SamoisCARE</Text>
          <Text style={styles.bannerSub}>Pilih dokter spesialis sesuai kebutuhan kesehatan Anda</Text>
        </View>
        <Text style={{ fontSize: 36 }}>🏥</Text>
      </View>

      <Text style={styles.sectionHeader}>Dokter Spesialis Tersedia</Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Tidak ada jadwal dokter tersedia.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('BookingScreen', { doctor: item })}
          >
            <View style={styles.avatarCircle}>
              <Text style={{ fontSize: 28 }}>{item.icon}</Text>
            </View>

            <View style={styles.doctorInfo}>
              <Text style={styles.docName}>{item.name}</Text>
              <Text style={styles.docSpec}>{item.specialty}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.docMeta}>⏱️ {item.experience}</Text>
                <Text style={styles.docPrice}>{item.price}</Text>
              </View>
            </View>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff', paddingHorizontal: 16 },
  centerLoading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f9ff' },
  banner: { backgroundColor: '#0284c7', padding: 20, borderRadius: 20, marginTop: 12, marginBottom: 20, flexDirection: 'row', alignItems: 'center', gap: 12 },
  bannerTag: { color: '#bae6fd', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  bannerTitle: { color: '#ffffff', fontSize: 18, fontWeight: '800', marginTop: 2 },
  bannerSub: { color: '#e0f2fe', fontSize: 12, marginTop: 4 },
  sectionHeader: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 12 },
  doctorCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 12, flexDirection: 'row', alignItems: 'center', elevation: 2, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6 },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  doctorInfo: { flex: 1 },
  docName: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  docSpec: { fontSize: 12, color: '#0284c7', marginTop: 2, fontWeight: '600' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  docMeta: { fontSize: 11, color: '#64748b' },
  docPrice: { fontSize: 12, fontWeight: '700', color: '#15803d' },
  ratingBadge: { backgroundColor: '#fef9c3', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: '#854d0e', fontWeight: '700', fontSize: 12 },
  emptyText: { textAlign: 'center', color: '#94a3b8', marginTop: 20 }
});