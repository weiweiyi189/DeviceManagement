package equipmentManagementSystem.service;

/**
 * 时效性缓存服务
 */
public interface CacheService<K, V> {

    void put(K key, V value);

    V get(K key);
}