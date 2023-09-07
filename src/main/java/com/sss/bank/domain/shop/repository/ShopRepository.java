package com.sss.bank.domain.shop.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sss.bank.domain.shop.entity.Shop;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {
	Optional<Shop> findShopByShopId(Long shopId);

	List<Shop> findAllByShopType(int shopType);
}
