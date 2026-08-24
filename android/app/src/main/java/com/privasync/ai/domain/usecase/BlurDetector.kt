package com.privasync.ai.domain.usecase

import android.graphics.Bitmap
import android.graphics.Color

/**
 * BlurDetector
 * Laplacian variance computation to flag shaky / out-of-focus images.
 */
object BlurDetector {
    private const val BLUR_THRESHOLD = 100.0

    fun getBlurScore(bitmap: Bitmap): Double {
        val width = bitmap.width; val height = bitmap.height
        val pixels = IntArray(width * height)
        bitmap.getPixels(pixels, 0, width, 0, 0, width, height)

        var mean = 0.0; var variance = 0.0
        val laplacians = mutableListOf<Double>()

        for (y in 1 until height - 1) {
            for (x in 1 until width - 1) {
                val center = luminance(pixels[y * width + x])
                val top    = luminance(pixels[(y - 1) * width + x])
                val bottom = luminance(pixels[(y + 1) * width + x])
                val left   = luminance(pixels[y * width + (x - 1)])
                val right  = luminance(pixels[y * width + (x + 1)])
                val lap = (top + bottom + left + right) - 4 * center
                laplacians.add(lap)
                mean += lap
            }
        }
        mean /= laplacians.size
        laplacians.forEach { variance += (it - mean) * (it - mean) }
        return variance / laplacians.size
    }

    fun isBlurry(bitmap: Bitmap): Boolean = getBlurScore(bitmap) < BLUR_THRESHOLD

    private fun luminance(pixel: Int): Double {
        val r = Color.red(pixel); val g = Color.green(pixel); val b = Color.blue(pixel)
        return 0.299 * r + 0.587 * g + 0.114 * b
    }
}
