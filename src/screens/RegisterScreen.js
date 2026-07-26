import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveRegisteredUser } from '../services/storage';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !address.trim() || !phone.trim()) {
      setErrorMessage('Semua data wajib diisi secara lengkap!');
      return;
    }
    if (!email.includes('@')) {
      setErrorMessage('Format email tidak valid!');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password minimal 6 karakter!');
      return;
    }

    setErrorMessage('');
    
    const newUser = { 
      name, 
      dob: formatDate(dob), 
      address, 
      phone, 
      email, 
      password, 
      profilePic: null,
      registeredAt: new Date().toISOString() 
    };
    await saveRegisteredUser(newUser);

    Alert.alert('Pendaftaran Berhasil', 'Akun pasien Anda telah aktif. Silakan login.', [
      { text: 'Masuk Sekarang', onPress: () => navigation.replace('LoginScreen') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Registrasi Pasien Baru</Text>
          <Text style={styles.subtitle}>Isi formulir di bawah ini dengan data diri Anda yang valid</Text>
        </View>

        <View style={styles.card}>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Text style={styles.label}>Nama Lengkap Pasien *</Text>
          <TextInput style={styles.input} placeholder="Nama sesuai KTP" placeholderTextColor="#94a3b8" value={name} onChangeText={setName} />

          <Text style={styles.label}>Tanggal Lahir *</Text>
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

          <Text style={styles.label}>Nomor Handphone / WA *</Text>
          <TextInput style={styles.input} placeholder="08xxxxxxxxxx" placeholderTextColor="#94a3b8" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Alamat Domisili *</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Alamat jalan, RT/RW, kota" placeholderTextColor="#94a3b8" value={address} onChangeText={setAddress} multiline numberOfLines={3} />

          <Text style={styles.label}>Alamat Email *</Text>
          <TextInput style={styles.input} placeholder="pasien@email.com" placeholderTextColor="#94a3b8" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>Kata Sandi Akun *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Minimal 6 Karakter"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleRegister} activeOpacity={0.8}>
            <Text style={styles.submitBtnText}>Daftar Akun Pasien</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 16, marginTop: 8 },
  title: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 4 },
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 20, elevation: 3, shadowColor: '#0f172a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 6, marginTop: 2 },
  input: { backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0', color: '#0f172a', fontSize: 14 },
  textArea: { height: 70, textAlignVertical: 'top' },
  datePickerBtn: { backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  datePickerText: { color: '#0f172a', fontSize: 14 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, marginBottom: 20 },
  passwordInput: { flex: 1, padding: 13, color: '#0f172a', fontSize: 14 },
  eyeButton: { padding: 12 },
  eyeIcon: { fontSize: 16 },
  submitBtn: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  submitBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  errorText: { color: '#ef4444', backgroundColor: '#fef2f2', padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 12, fontWeight: '600', textAlign: 'center' }
});