import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { getUser, updateUserData } from '../services/storage';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const data = await getUser();
    if (data) {
      setName(data.name || '');
      setAddress(data.address || '');
      setPhone(data.phone || '');
      setPassword(data.password || '');
      setProfilePic(data.profilePic || null);

      if (data.dob) {
        const parts = data.dob.split('/');
        if (parts.length === 3) setDob(new Date(parts[2], parts[1] - 1, parts[0]));
      }
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDob(selectedDate);
  };

  const handleSelectImage = () => {
    Alert.alert(
      'Ubah Foto Profil',
      'Pilih media pengambilan foto:',
      [
        { text: '📷 Ambil dari Kamera', onPress: pickFromCamera },
        { text: '🖼️ Pilih dari Galeri HP', onPress: pickFromGallery },
        { text: 'Batal', style: 'cancel' },
      ]
    );
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin Ditolak', 'Izin kamera diperlukan.');
      return;
    }
    let res = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!res.canceled) setProfilePic(res.assets[0].uri);
  };

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin Ditolak', 'Izin galeri diperlukan.');
      return;
    }
    let res = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], quality: 0.5 });
    if (!res.canceled) setProfilePic(res.assets[0].uri);
  };

  const handleSave = async () => {
    if (!name.trim() || !phone.trim() || !password.trim()) {
      Alert.alert('Gagal', 'Nama, No. Handphone, dan Password wajib diisi.');
      return;
    }

    await updateUserData({
      name,
      dob: formatDate(dob),
      address,
      phone,
      password,
      profilePic,
    });

    Alert.alert('Sukses', 'Data profil Anda telah diperbarui.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 36 }}>👤</Text>
            </View>
          )}
          <TouchableOpacity style={styles.changePicBtn} onPress={handleSelectImage}>
            <Text style={styles.changePicText}>📷 Ubah Foto Profil (Kamera/Galeri)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Tanggal Lahir</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>📅  {formatDate(dob)}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.label}>Nomor Handphone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Alamat Tempat Tinggal</Text>
          <TextInput style={[styles.input, styles.textArea]} value={address} onChangeText={setAddress} multiline numberOfLines={3} />

          <Text style={styles.label}>Ubah Kata Sandi (Password)</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

          <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.8}>
            <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  avatarSection: { alignItems: 'center', marginBottom: 20, marginTop: 8 },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center' },
  changePicBtn: { marginTop: 10, backgroundColor: '#ffffff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#bae6fd' },
  changePicText: { color: '#0284c7', fontWeight: '700', fontSize: 12 },
  formCard: { backgroundColor: '#ffffff', borderRadius: 20, padding: 20, elevation: 2 },
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0', color: '#0f172a', fontSize: 14 },
  textArea: { height: 70, textAlignVertical: 'top' },
  datePickerBtn: { backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  datePickerText: { color: '#0f172a', fontSize: 14 },
  saveBtn: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 }
});