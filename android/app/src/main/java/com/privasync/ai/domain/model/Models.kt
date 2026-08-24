package com.privasync.ai.domain.model

data class FaceMatchResult(
    val isMatch: Boolean,
    val confidence: Float
)

data class SensitiveDocumentResult(
    val isSensitive: Boolean,
    val documentType: String?,
    val extractedData: Map<String, String>
)

data class Photo(
    val id: String,
    val uri: String,
    val timestamp: Long,
    val location: String?,
    val contributor: String?,
    val ocrText: String?,
    val blurScore: Double,
    val isBlurry: Boolean,
    val isDuplicate: Boolean,
    val containsOwner: Boolean,
    val ownerMatchConfidence: Float,
    val pHash: String
)
