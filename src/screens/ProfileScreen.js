import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { getUser, clearUser, getBookings, updateUserData, deleteAccount } from '../services/storage';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [ktpImage, setKtpImage] = useState(null);
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const userData = await getUser();
    const bookingData = await getBookings();
    setUser(userData);
    setHistory(bookingData);
    if (userData && userData.ktpImage) setKtpImage(userData.ktpImage);
  };

  const takeKtpPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (!permissionResult.granted) {
      Alert.alert('Izin Ditolak', 'Aplikasi butuh izin kamera untuk verifikasi KTP.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setKtpImage(uri);
      await updateUserData({ ktpImage: uri });
    }
  };

  const handleLogout = async () => {
    await clearUser();
    navigation.replace('LoginScreen');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hapus Akun Permanen',
      'Apakah Anda yakin? Seluruh data akun dan riwayat booking Anda akan terhapus sepenuhnya.',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Permanen',
          style: 'destructive',
          onPress: async () => {
            await deleteAccount();
            navigation.replace('LoginScreen');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          {user?.profilePic ? (
            <Image source={{ uri: user.profilePic }} style={styles.avatarImg} />
          ) : (
            <View style={styles.avatarCirclePlaceholder}>
              <Text style={{ fontSize: 36 }}>👤</Text>
            </View>
          )}

          <Text style={styles.userName}>{user?.name || 'Pasien SamoisCARE'}</Text>
          <Text style={styles.userEmail}>{user?.email || '-'}</Text>

          <TouchableOpacity style={styles.editProfileBtn} onPress={() => navigation.navigate('EditProfileScreen')}>
            <Text style={styles.editProfileText}>✏️ Edit Profil & Sandi</Text>
          </TouchableOpacity>
        </View>

        {/* Data Diri Section */}
        <Text style={styles.sectionTitle}>Detail Informasi Pasien</Text>
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tanggal Lahir:</Text>
            <Text style={styles.infoVal}>{user?.dob || 'Belum diisi'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>No. Handphone:</Text>
            <Text style={styles.infoVal}>{user?.phone || 'Belum diisi'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Alamat Domisili:</Text>
            <Text style={styles.infoVal}>{user?.address || 'Belum diisi'}</Text>
          </View>
        </View>

        {/* KTP Section */}
        <Text style={styles.sectionTitle}>Verifikasi KTP Pasien</Text>
        <View style={styles.card}>
          {ktpImage ? (
            <Image source={{ uri: ktpImage }} style={styles.ktpImg} />
          ) : (
            <View style={styles.ktpPlaceholder}>
              <Text style={{ fontSize: 28, marginBottom: 4 }}>💳</Text>
              <Text style={{ color: '#94a3b8', fontSize: 12 }}>Belum ada foto KTP terverifikasi</Text>
            </View>
          )}

          <TouchableOpacity style={styles.cameraBtn} onPress={takeKtpPhoto}>
            <Text style={styles.cameraBtnText}>📷 Take / Change KTP Photo</Text>
          </TouchableOpacity>
        </View>

        {/* History Section */}
        <Text style={styles.sectionTitle}>Riwayat Konsultasi</Text>
        {history.length > 0 ? (
          history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
              <Text style={styles.historyDoc}>{item.doctorName}</Text>
              <Text style={styles.historyComplaint}>Keluhan: {item.complaint}</Text>
              <Text style={styles.historyDate}>📆 {item.date}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyHistory}>Belum ada riwayat booking konsultasi.</Text>
        )}

        {/* Action Buttons */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Keluar / Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
          <Text style={styles.deleteText}>🗑️ Hapus Akun Saya</Text>
        </TouchableOpacity>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  profileHeaderCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, alignItems: 'center', marginBottom: 16, elevation: 2 },
  avatarImg: { width: 84, height: 84, borderRadius: 42, marginBottom: 10 },
  avatarCirclePlaceholder: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  userName: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  userEmail: { fontSize: 12, color: '#64748b', marginTop: 2, marginBottom: 12 },
  editProfileBtn: { backgroundColor: '#e0f2fe', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  editProfileText: { color: '#0284c7', fontSize: 12, fontWeight: '700' },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginBottom: 8, marginTop: 8 },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, marginBottom: 14, elevation: 1 },
  infoRow: { marginBottom: 10 },
  infoLabel: { fontSize: 11, color: '#64748b', fontWeight: '600' },
  infoVal: { fontSize: 13, color: '#0f172a', fontWeight: '700', marginTop: 2 },
  ktpImg: { width: '100%', height: 150, borderRadius: 10, marginBottom: 10 },
  ktpPlaceholder: { width: '100%', height: 110, backgroundColor: '#f8fafc', borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  cameraBtn: { backgroundColor: '#0284c7', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  cameraBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 13 },
  historyItem: { backgroundColor: '#ffffff', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#e2e8f0' },
  historyDoc: { fontWeight: '700', fontSize: 13, color: '#0284c7' },
  historyComplaint: { fontSize: 12, color: '#334155', marginTop: 4 },
  historyDate: { fontSize: 11, color: '#94a3b8', marginTop: 6 },
  emptyHistory: { color: '#94a3b8', fontSize: 12, fontStyle: 'italic', marginBottom: 16 },
  logoutBtn: { backgroundColor: '#fef2f2', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 12 },
  logoutText: { color: '#ef4444', fontWeight: '700', fontSize: 14 },
  deleteBtn: { paddingVertical: 12, alignItems: 'center', marginTop: 6 },
  deleteText: { color: '#991b1b', fontSize: 12, fontWeight: '700' }
});