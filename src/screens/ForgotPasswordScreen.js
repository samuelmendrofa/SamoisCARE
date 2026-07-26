import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { getRegisteredUser, updateUserData } from '../services/storage';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    if (!email.trim() || !newPassword.trim()) {
      setErrorMessage('Email dan password baru wajib diisi!');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('Password baru minimal 6 karakter!');
      return;
    }

    const registeredUser = await getRegisteredUser();

    if (!registeredUser || registeredUser.email.toLowerCase() !== email.toLowerCase().trim()) {
      setErrorMessage('Alamat email tidak terdaftar di sistem!');
      return;
    }

    await updateUserData({ password: newPassword });

    Alert.alert('Sukses Reset Password', 'Kata sandi Anda berhasil diperbarui. Silakan masuk kembali.', [
      { text: 'Ke Halaman Login', onPress: () => navigation.navigate('LoginScreen') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 32 }}>🔒</Text>
        </View>
        <Text style={styles.title}>Lupa Kata Sandi?</Text>
        <Text style={styles.subtitle}>Verifikasi email Anda dan masukkan password baru</Text>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Text style={styles.label}>Email Terdaftar</Text>
        <TextInput
          style={styles.input}
          placeholder="masukkan@email.com"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Kata Sandi Baru</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Minimal 6 karakter"
            placeholderTextColor="#94a3b8"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleResetPassword} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Simpan Password Baru</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9ff', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#ffffff', padding: 24, borderRadius: 20, elevation: 3 },
  iconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#e0f2fe', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#0f172a', textAlign: 'center' },
  subtitle: { fontSize: 13, color: '#64748b', textAlign: 'center', marginBottom: 20, marginTop: 4 },
  label: { fontSize: 12, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: { backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, marginBottom: 14, borderWidth: 1, borderColor: '#e2e8f0', color: '#0f172a', fontSize: 14 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, marginBottom: 20 },
  passwordInput: { flex: 1, padding: 13, color: '#0f172a', fontSize: 14 },
  eyeButton: { padding: 12 },
  eyeIcon: { fontSize: 16 },
  button: { backgroundColor: '#0284c7', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  errorText: { color: '#ef4444', backgroundColor: '#fef2f2', padding: 10, borderRadius: 8, marginBottom: 14, fontSize: 12, fontWeight: '600', textAlign: 'center' }
});