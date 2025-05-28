package com.example.model;

import java.util.Objects;
import com.example.model.ResponseArtystaSalesSales;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseArtystaSales
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseArtystaSales   {
  @JsonProperty("sales")
  @Valid
  private List<ResponseArtystaSalesSales> sales = null;

  public ResponseArtystaSales sales(List<ResponseArtystaSalesSales> sales) {
    this.sales = sales;
    return this;
  }

  public ResponseArtystaSales addSalesItem(ResponseArtystaSalesSales salesItem) {
    if (this.sales == null) {
      this.sales = new ArrayList<>();
    }
    this.sales.add(salesItem);
    return this;
  }

  /**
   * Get sales
   * @return sales
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseArtystaSalesSales> getSales() {
    return sales;
  }

  public void setSales(List<ResponseArtystaSalesSales> sales) {
    this.sales = sales;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseArtystaSales responseArtystaSales = (ResponseArtystaSales) o;
    return Objects.equals(this.sales, responseArtystaSales.sales);
  }

  @Override
  public int hashCode() {
    return Objects.hash(sales);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseArtystaSales {\n");
    
    sb.append("    sales: ").append(toIndentedString(sales)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
