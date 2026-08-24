package com.privasync.ai.domain.usecase

import com.privasync.ai.domain.model.SensitiveDocumentResult

/**
 * SensitiveDocumentScanner
 * Regex classifiers for Indian ID cards (Aadhaar, PAN, Passports, Wi-Fi keys).
 */
object SensitiveDocumentScanner {
    private val AADHAAR_REGEX = Regex("""\b\d{4}\s?\d{4}\s?\d{4}\b""")
    private val PAN_REGEX     = Regex("""\b[A-Z]{5}\d{4}[A-Z]\b""")
    private val PASSPORT_REGEX = Regex("""\b[A-Z]\d{7}\b""")
    private val CARD_REGEX    = Regex("""\b(?:\d{4}[-\s]?){3}\d{4}\b""")
    private val WIFI_PASS_REGEX = Regex("""(?i)password[:\s]+(\S+)""")

    fun scan(ocrText: String): SensitiveDocumentResult {
        val aadhaar   = AADHAAR_REGEX.find(ocrText)?.value
        val pan       = PAN_REGEX.find(ocrText)?.value
        val passport  = PASSPORT_REGEX.find(ocrText)?.value
        val creditCard = CARD_REGEX.find(ocrText)?.value
        val wifiPass  = WIFI_PASS_REGEX.find(ocrText)?.groupValues?.getOrNull(1)

        val isSensitive = listOf(aadhaar, pan, passport, creditCard, wifiPass).any { it != null }
        val docType = when {
            aadhaar != null    -> "Aadhaar Card"
            pan != null        -> "PAN Card"
            passport != null   -> "Passport"
            creditCard != null -> "Credit / Debit Card"
            wifiPass != null   -> "Wi-Fi Credentials"
            else               -> null
        }

        return SensitiveDocumentResult(
            isSensitive  = isSensitive,
            documentType = docType,
            extractedData = mapOf(
                "aadhaarUid"  to (aadhaar ?: ""),
                "panNumber"   to (pan ?: ""),
                "passportNo"  to (passport ?: ""),
                "cardNumber"  to (creditCard ?: ""),
                "wifiPassword" to (wifiPass ?: "")
            ).filter { it.value.isNotEmpty() }
        )
    }
}
