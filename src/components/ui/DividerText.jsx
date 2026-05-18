import { motion } from "framer-motion";

export default function DividerWithText({isLogin}) {
  return (
    <div className="flex items-center w-full gap-3">
      {/* Left Line */}
      <motion.div
        className="flex-1 border-t border-gray-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "right" }}
      />

      {/* Text */}
      <motion.span
        className="text-gray-600 flex-1 text-sm font-medium whitespace-nowrap"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {isLogin?"New to dumBle?":"Already on dumBle"}
      </motion.span>

      {/* Right Line */}
      <motion.div
        className="flex-1 border-t border-gray-300"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
