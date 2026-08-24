package com.privasync.ai.domain.usecase

import android.graphics.Bitmap
import com.privasync.ai.domain.model.FaceMatchResult
import org.tensorflow.lite.Interpreter
import java.nio.ByteBuffer
import java.nio.ByteOrder
import kotlin.math.sqrt

/**
 * FaceMatcherUseCase
 * Runs MobileFaceNet (TFLite) on-device via Snapdragon NPU/GPU
 * for cross-pool face matching ("You're In This Too").
 */
class FaceMatcherUseCase(
    private val tfliteInterpreter: Interpreter
) {
    companion object {
        const val FACE_INPUT_SIZE = 112
        const val EMBEDDING_SIZE = 512
        const val MATCH_THRESHOLD = 0.75f
    }

    fun extractEmbedding(faceBitmap: Bitmap): FloatArray {
        val scaled = Bitmap.createScaledBitmap(faceBitmap, FACE_INPUT_SIZE, FACE_INPUT_SIZE, true)
        val inputBuffer = ByteBuffer.allocateDirect(1 * FACE_INPUT_SIZE * FACE_INPUT_SIZE * 3 * 4)
            .apply { order(ByteOrder.nativeOrder()) }

        for (y in 0 until FACE_INPUT_SIZE) {
            for (x in 0 until FACE_INPUT_SIZE) {
                val pixel = scaled.getPixel(x, y)
                inputBuffer.putFloat(((pixel shr 16 and 0xFF) - 127.5f) / 127.5f)
                inputBuffer.putFloat(((pixel shr 8 and 0xFF) - 127.5f) / 127.5f)
                inputBuffer.putFloat(((pixel and 0xFF) - 127.5f) / 127.5f)
            }
        }

        val output = Array(1) { FloatArray(EMBEDDING_SIZE) }
        tfliteInterpreter.run(inputBuffer, output)
        return output[0]
    }

    fun cosineSimilarity(a: FloatArray, b: FloatArray): Float {
        var dot = 0f; var normA = 0f; var normB = 0f
        for (i in a.indices) { dot += a[i] * b[i]; normA += a[i] * a[i]; normB += b[i] * b[i] }
        return if (normA == 0f || normB == 0f) 0f else dot / (sqrt(normA) * sqrt(normB))
    }

    fun matchAgainstOwner(photoEmbedding: FloatArray, ownerEmbedding: FloatArray): FaceMatchResult {
        val similarity = cosineSimilarity(photoEmbedding, ownerEmbedding)
        return FaceMatchResult(
            isMatch = similarity >= MATCH_THRESHOLD,
            confidence = (similarity * 100).coerceIn(0f, 100f)
        )
    }
}
