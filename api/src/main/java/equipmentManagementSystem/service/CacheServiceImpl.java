package equipmentManagementSystem.service;

import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 时效性缓存服务实现
 */
@Service
public class CacheServiceImpl<K, V> implements CacheService<K, V> {

    /** 清空缓存概率 1/2^4 后四位全为 1 */
    private int clearProbability = 0b1111;

    /** 缓存持有 */
    private Map<Object, TimeValueHolder<V>> cache = new ConcurrentHashMap<>();

    private static class TimeValueHolder<T> {
        /** 存储的值 */
        private T value;

        /** 过期时间 */
        private Calendar expiration;

        public TimeValueHolder(T value, Calendar expiration) {
            this.value = value;
            this.expiration = expiration;
        }

        /**
         * 校验是否过期
         */
        public boolean isExpired() {
            Calendar calendar = Calendar.getInstance();
            return calendar.after(this.expiration);
        }

        /**
         * 获取 value
         */
        public T getValue() {
            return this.value;
        }
    }

    @Override
    public void put(K key, V value) {
        /* 设置超时时间 */
        Calendar calendar = Calendar.getInstance();
        /* 与 value 共同添加到 cache 中 */
        this.cache.put(key, new TimeValueHolder<>(value, calendar));
    }

    @Override
    public V get(K key) {
        /* key 不存在 返回 null */
        if (!this.cache.containsKey(key)) {
            return null;
        }
        /* 获取 值 */
        TimeValueHolder<V> holder = this.cache.get(key);
        /* 如果过期 清除 key 返回 null */
        if (holder.isExpired()) {
            this.cache.remove(key);
            return null;
        }
        /* 随机清除缓存 */
        this.clearCacheRandom();
        /* 获取值 */
        return holder.getValue();
    }

    /**
     * 随机清除cache
     * 当前时间的尾数为 1111b 时，对过期的验证码进行清除
     */
    private void clearCacheRandom() {
        if ((Calendar.getInstance().getTimeInMillis() & this.clearProbability) == this.clearProbability) {
            this.cache.entrySet().removeIf(e -> e.getValue().isExpired());
        }
    }
}

